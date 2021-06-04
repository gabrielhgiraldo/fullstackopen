const jwt = require('jsonwebtoken')
const blogsRouter = require("express").Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const validateUser = async request => {
  const token = request.body.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  return user
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {'username':1, 'name':1, 'id':1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.url || !body.title) {
    return response.status(400).send({error:'request missing url or title'})
  }  

  const user = await validateUser(request)

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    likes: request.body.likes || 0,
    url: request.body.url,
    date: new Date(),
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = await validateUser(request)
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() !== user.id.toString()) {
    return response.status(403).json({ error: "only creator of blog can delete blog" })
  }
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
