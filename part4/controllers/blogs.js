const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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

const getTokenFromRequest = request => {
  const authorization = request.get('authorization')
  const isBearer = authorization && authorization.toLowerCase().startsWith('bearer ')

  if (isBearer) return authorization.substring(7)
  return null
}

blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body
  if (!title && !url) return response.status(400).end()

  const token = getTokenFromRequest(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    user: user.id,
    ...request.body
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

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
