const blogsRouter = require("express").Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs) 
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      likes: request.body.likes,
      url: request.body.url,
      date: new Date(),
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter
  

