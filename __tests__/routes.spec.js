const request = require('supertest');
const app = require('../index').app;
const config = require('../common/config/env.config')

describe('USER API Endpoints', () => {
    beforeAll(() => {
        jest.setTimeout(90 * 1000)
    })

    it('GET /users should return 201', function (done) {
        request(app).get(`${config.api.uri}users`).then(res => {
            expect(res.status).toEqual(201)
            done()
        })
    })
    it('GET /users/1 should return 201', function (done) {
        request(app).get(`${config.api.uri}users/1`).then(res => {
            expect(res.status).toEqual(201)
            done()
        })
    })
})
