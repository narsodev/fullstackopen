const User = require('../models/user')

const usernameIsValid = async username => {
  const usernameNotUnique = await User.findOne({ username })
  if (usernameNotUnique) {
    return 'username must be unique'
  }
}

const validator = { usernameIsValid }
module.exports = validator
