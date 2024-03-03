import request from 'supertest';
import appInit from '../App';
import mongoose from 'mongoose';
import Post from '../models/post-model';
import { Express } from 'express';

let app: Express;

beforeAll(async () =>  {
    app = await appInit();
    console.log('Before all tests');
    await Post.deleteMany();
});

afterAll(async () => {
    console.log('After all tests');
    await mongoose.connection.close();
});

describe('Post CRUD operations', () => {
    test("POST /post", async () => {
        const res = await request(app).post('/post').send(posts[0]);
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(posts[0].title);
    });

    test("GET /post", async () => {
        const res = await request(app).get('/post');
        expect(res.status).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
    });

    test("GET /post/:id", async () => {
        const res = await request(app).get('/post/' + posts[0].owner);
        expect(res.status).toBe(200);
        expect(res.body.title).toBe(posts[0].title);
    });

    test("PUT /post/:id", async () => {
        const res = await request(app)
            .put('/post/' + posts[0].owner)
            .send({ title: 'Updated Post', message: 'Updated Content', owner: '127' });
        expect(res.status).toBe(200);
        const updatedPost = await Post.findById(posts[0].owner);
        expect(updatedPost.title).toBe('Updated Post');
        expect(updatedPost.message).toBe('Updated Content');
    });

    test("DELETE /post/:id", async () => {
        const res = await request(app).delete('/post/' + posts[0].owner);
        expect(res.status).toBe(200);
        const deletedPost = await Post.findById(posts[0].owner);
        expect(deletedPost).toBeNull();
    });

});
const posts = [
    {
        title: 'Post 1',
        message: 'Content 1',
        owner: '127'
    },
    {
        title: 'Post 2',
        message: 'Content 2',
        owner: '128'
    },
    // More posts...
];