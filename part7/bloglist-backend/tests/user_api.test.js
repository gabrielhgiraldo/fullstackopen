const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
    {
        name:'DELETE ME',
        username:'DELETE ME',
        password:'123'
    }
]
beforeEach(async () => {
    await User.deleteMany({})
    const userObjects = initialUsers.map(user => new User(user))
    const userSavePromises = userObjects.map(user => user.save())
    await Promise.all(userSavePromises)
})

test('user created successfully', async () => {
    const newUser = {
        name:'DELETE ME 2',
        username:'DELETE ME 2',
        password:'1234'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length + 1)

    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ name: newUser.name, username: newUser.username })
        ])
    )
})

test('creation fails with proper status code and message if username already taken', async () => {
    const response = await api
        .post('/api/users')
        .send(initialUsers[0])
        .expect(400)
        .expect('Content-Type', /application\/json/)
    expect(response.body.error).toContain('`username` to be unique')
    const result = await api.get('/api/users')
    expect(result.body.length).toEqual(initialUsers.length)
})

test('creation fails with proper status code and message if username is missing', async () => {
    const response = await api
        .post('/api/users')
        .send({ ...initialUsers[0], username: undefined })
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.error).toContain('`username` is required')
    const result = await api.get('/api/users')
    expect(result.body.length).toEqual(initialUsers.length)
})

test('creation fails with proper status code and message if username is too short', async () => {
    const response = await api
        .post('/api/users')
        .send({ ...initialUsers[0], username: 'ab' })
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    expect(response.body.error).toContain('is shorter than the minimum allowed length ')
    const result = await api.get('/api/users')
    expect(result.body.length).toEqual(initialUsers.length)
})

test('creation fails with proper status code and message if password is missing', async () => {
    const response = await api
        .post('/api/users')
        .send({ ...initialUsers[0], password:'' })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('password is required')
    const result = await api.get('/api/users')
    expect(result.body.length).toEqual(initialUsers.length)
})

test('creation fails with proper status code and message if password is too short', async () => {
    const response = await api
        .post('/api/users')
        .send({ ...initialUsers[0], password:'12' })
        .expect(400)
        .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('password must be longer than 2 characters')
    const result = await api.get('/api/users')
    expect(result.body.length).toEqual(initialUsers.length)
})

afterAll(() => {
    mongoose.connection.close()
})