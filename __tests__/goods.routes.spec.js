const request = require('supertest');
const app = require('../index').app;
const config = require('config')
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYmFrdW0udkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImJha3VtIiwicGVybWlzc2lvbkxldmVsIjoyMDQ4LCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6IlZpYWNoZXNsYXYgQmFrdW0iLCJyZWZyZXNoS2V5IjoiRitSZ2dCc29jczlyVkkyalVWc3NsZz09IiwiaWF0IjoxNjQwOTYyOTMyfQ.W8snpnexv3wcFxAE2k7ewZ0dSu0Nmxi1DBt54Vqx2IQ"

closeServer = () => {
    if (app.get('server')) app.get('server').close()

}

describe('GOODS API Endpoints', () => {
    beforeAll(() => {
        jest.setTimeout(90 * 1000)
    })

    afterAll(closeServer)

    it('GET /goods should return 200', function (done) {
        request(app).get(`${config.api.uri}goods`)
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', `application/json; charset=utf-8`)
            .then(res => {
                expect(res.status).toEqual(200)
                done()
            })
    })

})
