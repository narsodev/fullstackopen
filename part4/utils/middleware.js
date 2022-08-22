const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  const { method, path, body } = request

  logger.info(`${method}: ${path}`)
  logger.info(body)
  logger.info('--------------')

  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  }

  logger.error(error.message)

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const isBearer = authorization && authorization.toLowerCase().startsWith('bearer ')

  request.token = isBearer
    ? authorization.substring(7)
    : null

  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  if (!user) {
    return response.status(401).json({
      error: 'user not found'
    })
  }

  request.user = user

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
