const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body

  if (!title && !url) return response.status(400).end()

  const blog = new Blog(request.body)

  const createdBlog = await blog.save()
  response.status(201).json(createdBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params

  const updatedBlog = await Blog
    .findByIdAndUpdate(id, request.body, { new: true })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

module.exports = blogsRouter
