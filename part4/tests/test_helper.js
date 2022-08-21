const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'No todo es un objeto en JavaScript',
    author: 'midudev',
    url: 'https://midu.dev/no-todo-objeto-javascript',
    likes: 73
  },
  {
    title: 'Full Stack Open 2022',
    author: 'University of Helsinki',
    url: 'https://fullstackopen.com/en',
    likes: 1156
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    username: 'narso',
    name: 'Narciso González',
    passwordHash: '43h34rio32942'
  },
  {
    username: 'vicky',
    name: 'Victoria Pinto',
    passwordHash: '89423feewf933'
  }
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const helper = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}

module.exports = helper
