"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_model_1 = __importDefault(require("../models/student-model"));
let app;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    app = yield (0, App_1.default)();
    console.log('Before all tests');
    yield student_model_1.default.deleteMany();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('After all tests');
    yield mongoose_1.default.connection.close();
}));
describe('Student tests', () => {
    test("GET /students", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/students');
        expect(res.status).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
        console.log(data);
    }));
    test("POST /students", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app)
            .post('/students')
            .send(students[0]);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(students[0].name);
        // studentId = res.body._id;
        const res2 = yield (0, supertest_1.default)(app).get('/students');
        expect(res2.status).toBe(200);
        const data = res2.body;
        expect(data[0].name).toBe('John');
        expect(data[0]._id).toBe('127');
        expect(data[0].age).toBe(20);
    }));
    test("GET /students/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/students/' + students[0]._id);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(students[0].name);
    }));
    test("fail GET /students/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/students/0000');
        expect(res.status).toBe(404);
    }));
    test("DELETE /students/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).delete('/students/' + students[0]._id);
        expect(res.status).toBe(200);
        const res2 = yield (0, supertest_1.default)(app).get('/students/' + students[0]._id);
        expect(res2.status).toBe(404);
    }));
    test("PUT /students/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const r = yield (0, supertest_1.default)(app)
            .post('/students')
            .send(students[0]);
        expect(r.status).toBe(201);
        expect(r.body.name).toBe(students[0].name);
        const res = yield (0, supertest_1.default)(app)
            .put('/students/' + students[0]._id)
            .send({ name: "John Doe" });
        expect(res.status).toBe(200);
        const res2 = yield (0, supertest_1.default)(app).get('/students/' + students[0]._id);
        expect(res2.status).toBe(200);
        expect(res2.body.name).toBe('John Doe');
    }));
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
];
//# sourceMappingURL=student.test.js.map