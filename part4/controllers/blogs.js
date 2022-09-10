const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1, name: 1, id: 1
    })
  response.json(blogs)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const { title, url } = request.body
  if (!title && !url) return response.status(400).end()

  const { user } = request

  const blog = new Blog({
    user: user.id,
    ...request.body
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const { id } = request.params

  const updatedBlog = await Blog
    .findByIdAndUpdate(id, request.body, { new: true })
    .populate('user', {
      username: 1, name: 1, id: 1
    })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const { id } = request.params

  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).end()

  const { user } = request
  const userIsOwner = user.id === blog.user.toString()

  if (!userIsOwner) {
    return response.status(401).json({
      error: 'this blog does not belong to you'
    })
  }

  await blog.delete()
  response.status(204).end()
})

module.exports = blogsRouter
