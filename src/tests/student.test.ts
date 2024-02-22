import request from 'supertest';
import appInit from '../App';
import mongoose from 'mongoose';
import Student from '../models/student-model';
import { Express } from 'express';

let app: Express;

beforeAll(async () =>  {
    app = await appInit();
    console.log('Before all tests');
    await Student.deleteMany();
});

afterAll(async () => {
    console.log('After all tests');
    await mongoose.connection.close();
});

describe('Student CRUD operations', () => {
   

    test("POST /students", async () => {
        const res = await request(app)
            .post('/students')
            .send(students[0]);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(students[0].name);
    });

    test("GET /students", async () => {
        const res = await request(app).get('/students');
        expect(res.status).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    test("GET /students/:id", async () => {
        const res = await request(app).get('/students/' + students[0]._id);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(students[0].name);
    });

    test("PUT /students/:id", async () => {
        const res = await request(app)
            .put('/students/' + students[0]._id)
            .send({ name: 'Updated Name', age: 25 });
        expect(res.status).toBe(200);
        const updatedStudent = await Student.findById(students[0]._id);
        expect(updatedStudent.name).toBe('Updated Name');
        expect(updatedStudent.age).toBe(25);
    });

    test("DELETE /students/:id", async () => {
        const res = await request(app).delete('/students/' + students[0]._id);
        expect(res.status).toBe(200);
        const deletedStudent = await Student.findById(students[0]._id);
        expect(deletedStudent).toBeNull();
    });

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
    }
];
