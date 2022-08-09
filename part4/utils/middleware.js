const logger = require('./logger')

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
  logger.error(error.message)

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
