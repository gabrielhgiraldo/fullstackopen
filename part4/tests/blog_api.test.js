const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const blogSavePromises = blogObjects.map(blog => blog.save())
    await Promise.all(blogSavePromises)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog posts unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})


test('new blog is created with post request', async () => {
    const newBlog = {
        title: 'i am a test blog, delete me.',
        url: 'https://testblog.com',
        author: 'sample mcSamplesteen',
        likes: 0
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1)

    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining(newBlog)
        ])
    )
})

test('likes defaults to 0 if missing from request body on creation', async () => {
    const newBlog = {
        title: 'i am a test blog, delete me.',
        url: 'https://testblog.com',
        author: 'sample mcSamplesteen',
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                ...newBlog,
                likes: 0
            })
        ])
    )
})

test('blog creation without url or title returns 400', async () => {
    const noURLBlog = {
        title: 'i am a test blog, delete me.',
        url: undefined,
        author: 'sample mcSamplesteen',
        likes: 0
    }
    const noTitleBlog = {
        title: undefined,
        url: 'https://testblog.com',
        author: 'sample mcSamplesteen',
        likes: 0
    }
    await api
        .post('/api/blogs')
        .send(noURLBlog)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(noTitleBlog)
        .expect(400)
})

test('blog deleted with valid id', async () => {
    const blogID = "5a422a851b54a676234d17f7"
    await api
        .delete(`/api/blogs/${blogID}`)
        .expect(204)
})

test('update blogs successful', async () => {
    const blogID = "5a422a851b54a676234d17f7"
    const blogUpdate = {
        likes: 1000
    }
    const response = await api
        .put(`/api/blogs/${blogID}`)
        .send(blogUpdate)
        .expect(200)
    
    expect(response.body).toMatchObject(blogUpdate)
})
afterAll(() => {
    mongoose.connection.close()
})