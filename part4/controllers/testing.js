const Blog = require('../models/blog')
const User = require('../models/user')
const testingRouter = require('express').Router()

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(240).end()
})

module.exports = testingRouter