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

afterAll(() => {
    mongoose.connection.close()
})