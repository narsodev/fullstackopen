const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const validator = require('../utils/validator')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const error = await validator.usernameIsValid(username)
  if (error) {
    return response.status(400).json({ error })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter
