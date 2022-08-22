const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1, name: 1, id: 1
    })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body

  if (!title && !url) return response.status(400).end()

  const userOwner = await User.findOne({})
  const blog = new Blog({
    user: userOwner.id,
    ...request.body
  })

  const savedBlog = await blog.save()
  userOwner.blogs = userOwner.blogs.concat(savedBlog.id)
  await userOwner.save()

  response.status(201).json(savedBlog)
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
