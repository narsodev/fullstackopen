const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog has a propierty named id', async () => {
    const response = await api.get('/api/blogs')

    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Testing is great!',
      author: 'tester',
      url: 'http://localhost/test',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogsContent = blogsAtEnd.map(blog => {
      const { title, author, url, likes } = blog

      return { title, author, url, likes }
    })

    expect(blogsContent).toContainEqual(newBlog)
  })

  test('the value of the "likes" property of the blog will be 0 if it is missing',
    async () => {
      const newBlog = {
        title: 'Testing is great!',
        author: 'tester',
        url: 'http://localhost/test'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)

      expect(response.body.likes).toBe(0)
    }
  )

  test('blog without title and url propierties is not added', async () => {
    const newBlog = {
      author: 'tester',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
