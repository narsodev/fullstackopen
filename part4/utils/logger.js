const { NODE_ENV } = process.env

const info = (...params) => {
  if (NODE_ENV !== 'test') console.log(...params)
}

const error = (...params) => {
  if (NODE_ENV !== 'test') console.error(...params)
}

const logger = { info, error }

module.exports = logger
