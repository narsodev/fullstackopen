const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  const createdBlog = blog.save()
  response.status(201).json(createdBlog)
})

module.exports = blogsRouter
