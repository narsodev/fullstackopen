const logger = require('./logger')

const requestLogger = (request, response, next) => {
  const { method, path, body } = request

  logger.info(`${method}: ${path}`)
  logger.info(body)
  logger.info('--------------')

  next()
}

module.exports = {
  requestLogger
}
