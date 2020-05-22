const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db('users').truncate()
})

// tests for the jokes router
describe('jokes', () => {
    describe('get request to /api/jokes', () => {
        // make sure testToken is available to all tests by initializing it outside the tests
        let testToken = ''
        // register to access the restricted route
        beforeEach(async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send({
                    username: "testUser",
                    password: 'testPass'
                })
            testToken = response.body.token
        })
        it('should return an array', async () => {
            const response = await request(server)
                .get('/api/jokes')
                .set('Authorization', testToken)
            // we should get an array of the jokes in response.body 
            expect(Array.isArray(response.body)).toBe(true)
        })
        it('should return a status 200', async () => {
            const response = await request(server)
                .get('/api/jokes')
                .set('Authorization', testToken)  
            expect(response.status).toBe(200)
        })
    })
})
