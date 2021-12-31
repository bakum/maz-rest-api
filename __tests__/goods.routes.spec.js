const request = require('supertest');
const app = require('../index').app;
const config = require('../common/config/env.config')
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYmFrdW0udkBnbWFpbC5jb20iLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6IlZpYWNoZXNsYXYgQmFrdW0iLCJyZWZyZXNoS2V5IjoiNmtGNFRXTzlRNFY4NWVlSnk5SVRlQT09IiwiaWF0IjoxNjQwOTQ4NTA4fQ.VoLZRPK8aD_AxYoazv01_kiCDpuE8a5AREl-VsCity0"

describe('GOODS API Endpoints', () => {
    beforeAll(() => {
        jest.setTimeout(90 * 1000)
    })

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
