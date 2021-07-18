const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send({ username: 'sampleUser0', password: "123", "name": 'sampleUser0'})
})

test('login successful with valid user and password', async () => {
    const response = await api
        .post('/api/login')
        .send({ username: "sampleUser0", password: "123" })
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('token')
    expect(response.body).toMatchObject({ username: "sampleUser0", name: "sampleUser0"})
})

test('login fails with proper status code and message if incorrect password', async () => {
    const response = await api
        .post('/api/login')
        .send({ username: "sampleUser0", password: "WRONG" })
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('invalid username or password')
})

test('login fails with proper status code and message if incorrect username', async () => {
    const response = await api
        .post('/api/login')
        .send({ username: "WRONG", password: "123" })
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('invalid username or password')
})


afterAll(() => {
    mongoose.connection.close()
})