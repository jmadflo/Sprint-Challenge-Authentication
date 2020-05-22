const request = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

beforeEach(async () => {
    await db('users').del()
})

describe('users', () => {
    // test for registering a new user
    describe('post request to /api/auth/register', () => {
        it('should return username and a token', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send({
                    username: "testUser",
                    password: 'testPass'
                })
            // we get username and truthy token    
            expect(response.body.data.username).toBe('testUser')
            expect(response.body.token).toBeTruthy()
        })
        it('should return a status 201', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send({
                    username: "testUser",
                    password: 'testPass'
                })
            expect(response.status).toBe(201)
        })
    })
    // test for logging in a user
    describe('post request to /api/auth/login', () => {
        // first register user, so that we can then login with those credentials
        const credentials = {
            username: "testUser",
            password: 'testPass'
        }
        beforeEach(async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send(credentials)
        })
        it('should return an array', async () => {
            const response = await request(server)
                .post('/api/auth/login')
                .send(credentials)
            // got back welcome message and token
            expect(response.body.message).toBe(`Welcome to our API ${credentials.username}`)
            expect(response.body.token).toBeTruthy()
        })
        it('should return a status 200', async () => {
            const response = await request(server)
                .post('/api/auth/login')
                .send(credentials)
            expect(response.status).toBe(200)
        })
    })
})