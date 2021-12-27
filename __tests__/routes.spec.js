const request = require('supertest');
const app = require('../index').app;

describe('MAZ API Endpoints', () => {
    beforeAll(() => {
        jest.setTimeout(90 * 1000)
    })

    it('GET / should return 200', function (done) {
        request(app).get('/').then(res => {
            expect(res.status).toEqual(200)
            done()
        })
    })
})
