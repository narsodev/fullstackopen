const User = require('../models/user')

const usernameIsInvalid = async username => {
  const invalidLength = username.length < 3
  if (invalidLength) {
    return 'username must be at least 3 characters long'
  }

  const usernameNotUnique = await User.findOne({ username })
  if (usernameNotUnique) {
    return 'username must be unique'
  }

  return false
}

const passwordIsInvalid = password => {
  const invalidLength = password.length < 3
  if (invalidLength) {
    return 'password must be at least 3 characters long'
  }

  return false
}

const userIsInvalid = async ({ username, name, password }) => {
  if (!username) return 'username required'
  if (!password) return 'password required'

  const usernameError = await usernameIsInvalid(username)
  if (usernameError) return usernameError

  const passwordError = passwordIsInvalid(password)
  if (passwordError) return passwordError

  return false
}

const validator = { userIsInvalid }
module.exports = validator
