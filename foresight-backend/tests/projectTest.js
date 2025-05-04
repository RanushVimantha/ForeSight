const request = require('supertest');
const app = require('../app');

describe('Project API Tests', () => {

    test('Create a new project', async () => {
        const res = await request(app)
            .post('/projects')
            .send({
                name: 'Unit Test Project',
                description: 'Created during unit test',
                status: 'Active'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('name', 'Unit Test Project');
    });

    test('Fetch a project', async () => {
        const res = await request(app).get('/projects/1'); // Use a valid ID in your DB
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('name');
    });

});
