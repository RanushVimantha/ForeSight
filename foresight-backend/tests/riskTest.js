const request = require('supertest');
const app = require('../app');

describe('Risk API Tests', () => {

    test('Create a new risk', async () => {
        const res = await request(app)
            .post('/risks')
            .send({
                title: 'Test Risk',
                category: 'Financial',
                probability: 2,
                impact: 4,
                status: 'Open',
                project_id: 1
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('title', 'Test Risk');
    });

    test('Fetch all risks', async () => {
        const res = await request(app).get('/risks');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

});
