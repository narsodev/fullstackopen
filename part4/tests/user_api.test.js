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
})

afterAll(() => {
  mongoose.connection.close()
})
