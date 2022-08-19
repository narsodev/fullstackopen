const Blog = require('../models/blog')

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

const helper = { initialBlogs, blogsInDb }

module.exports = helper
