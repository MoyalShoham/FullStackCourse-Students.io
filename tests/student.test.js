const request = require('supertest');
const appInit = require('../App');
const mongoose = require('mongoose');
const Student = require('../models/student-model');

let app;
beforeAll(async () =>  {
    app = await appInit();
    console.log('Before all tests');
    await Student.deleteMany();
});

afterAll(async () => {
    console.log('After all tests');
    await mongoose.connection.close();
});


describe('Student tests', () => {
    test("GET /students", async () => {
        const res = await request(app).get('/students');
        expect(res.status).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
        console.log(data);
    });

    test("POST /students", async () => {
        const res = await request(app)
            .post('/students')
            .send(students[0]);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(students[0].name);
        // studentId = res.body._id;

        const res2 = await request(app).get('/students');
        expect(res2.status).toBe(200);
        const data = res2.body;
        
        expect(data[0].name).toBe('John');
        expect(data[0]._id).toBe('127');
        expect(data[0].age).toBe(20);

    });

    test("GET /students/:id", async () => {
        const res = await request(app).get('/students/' + students[0]._id);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(students[0].name);

    });

    test("fail GET /students/:id", async () => {
        const res = await request(app).get('/students/0000');
        expect(res.status).toBe(404);
    });

    test("DELETE /students/:id", async () => {
        const res = await request(app).delete('/students/' + students[0]._id);
        expect(res.status).toBe(200);

        const res2 = await request(app).get('/students/'+ students[0]._id);
        expect(res2.status).toBe(404);
    });

    test("PUT /students/:id", async () => {
        const r = await request(app)
                        .post('/students')
                        .send(students[0]);
        expect(r.status).toBe(201);
        expect(r.body.name).toBe(students[0].name);

        const res = await request(app)
                        .put('/students/' + students[0]._id)
                        .send({name: "John Doe"});
        expect(res.status).toBe(200);

        const res2 = await request(app).get('/students/'+ students[0]._id);
        expect(res2.status).toBe(200);
        expect(res2.body.name).toBe('John Doe');
    });

    // test("DELETE /students/:id", async () => {
    //     const res = await request(app).delete('/students/' + students[0]._id);
    //     expect(res.status).toBe(200);
    //     expect(res.body.name).toBe('John Doe');
    // });





});

const students = [
    {
        name: "John",
        _id: "127",
        age: 20,
    },
    {
        name: "Jane",
        _id: "128",
        age: 21,
    },
    {
        name: "Jim",
        _id: "129",
        age: 22,
    },
    {
        name: "Jill",
        _id: "130",
        age: 23,
    }
]

