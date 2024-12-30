const request = require('supertest');
const { app, mongoose } = require('../../../server');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/moodmusic', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Integration Tests for Mood API', () => {
    test('GET /api/mood/happy returns tracks for happy mood', async () => {
        const response = await request(app).get('/api/mood/happy');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('GET /api/mood/invalid returns 500 error', async () => {
        const response = await request(app).get('/api/mood/invalid');
        expect(response.status).toBe(500);
        expect(response.body.error).toBeDefined();
    });
});
