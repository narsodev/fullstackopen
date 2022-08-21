const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('when there is initially some users saved', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})

describe('addition of a new user', () => {
  test('a valid user can be added', async () => {
    const newUser = {
      username: 'tester',
      name: 'Tester',
      password: 'T3ST1NG 1S GR3AT!'
    }

    const { body: createdUser } = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(createdUser).toHaveProperty('username', newUser.username)
    expect(createdUser).toHaveProperty('name', newUser.name)

    const usersAtEnd = await helper.usersInDb()
    const usernamesOfUsersAtEnd = usersAtEnd.map(user => user.username)

    expect(usernamesOfUsersAtEnd).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: usersAtStart[0].username,
      name: usersAtStart[0].name,
      password: 'test'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('error', 'username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('creation fails with proper statuscode and message if username is not, at least, 3 characters long', async () => {
    const newUser = {
      username: 'hi',
      name: 'Hello',
      password: 'test'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('error', 'username must be at least 3 characters long')
  })

  test('creation fails with proper statuscode and message if password is not, at least, 3 characters long', async () => {
    const newUser = {
      username: 'pass',
      name: 'Hello',
      password: 'no'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveProperty('error', 'password must be at least 3 characters long')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
