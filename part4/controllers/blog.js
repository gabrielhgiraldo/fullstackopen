const blogsRouter = require("express").Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.body.url || !request.body.title) {
    return response.status(400).send({error:'request missing url or title'})
  }
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes || 0,
    url: request.body.url,
    date: new Date(),
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blogUpdate = {
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, { new: true})
  response.status(200).send(updatedBlog)
})

module.exports = blogsRouter
