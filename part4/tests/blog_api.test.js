const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await User.deleteMany({})
  const user = new User(helper.initialUsers[0])
  const createdUser = await user.save()

  const blogsToInsert = helper.initialBlogs.map(blog => ({
    user: createdUser.id,
    ...blog
  }))
  await Blog.insertMany(blogsToInsert)
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

    const { token, id: userId } = await helper.getUserToken()

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogCreated = blogsAtEnd.find(blog => blog.id === response.body.id)
    expect(blogCreated).toBeTruthy()
    expect(blogCreated).toHaveProperty('title', newBlog.title)
    expect(blogCreated.user.toString()).toBe(userId)
  })

  test('the value of the "likes" property of the blog will be 0 if it is missing',
    async () => {
      const newBlog = {
        title: 'Testing is great!',
        author: 'tester',
        url: 'http://localhost/test'
      }

      const { token } = await helper.getUserToken()

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)

      expect(response.body.likes).toBe(0)
    }
  )

  test('blog without title and url propierties is not added', async () => {
    const newBlog = {
      author: 'tester',
      likes: 1
    }

    const { token } = await helper.getUserToken()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
  })

  test('fails with proper statuscode if a token is not provided', async () => {
    const newBlog = {
      title: 'token are importants!'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    expect(response.body).toHaveProperty('error', 'invalid token')

    const blogsAtEnd = await helper.blogsInDb()
    const blogsTitles = blogsAtEnd.map(blog => blog.title)
    expect(blogsTitles).not.toContain(newBlog.title)
  })
})

describe('update of a blog', () => {
  test('succeeds with status code 200 if blog is valid', async () => {
    const newBlog = {
      title: 'Updated blog',
      url: 'http://localhost/test',
      author: 'tester',
      likes: 3
    }

    const blogsAtStart = await helper.blogsInDb()
    const [blogToUpdate] = blogsAtStart

    const { token } = await helper.getUserToken()

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const blogUpdated = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(blogUpdated).toBeTruthy()

    const { title, url, author, likes } = blogUpdated
    const contentOfBlogUpdated = { title, url, author, likes }
    expect(contentOfBlogUpdated).toEqual(newBlog)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const { token } = await helper.getUserToken()

    const blogsAtStart = await helper.blogsInDb()
    const [blogToDelete] = blogsAtStart

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
