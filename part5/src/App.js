import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import { login } from './services/login'

import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogsSorted, setBlogsSorted] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  useEffect(() => {
    const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)
    setBlogsSorted(blogsSorted)
  }, [blogs])

  const handleLogin = (username, password) => {
    login({ username, password })
      .then(user => {
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        createNotification(`Logged as ${username}`)
      })
      .catch(error => {
        console.error(error)
        const { error: errorMessage } = error.response.data
        createNotification(errorMessage, 'red')
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    createNotification('Logged out')
  }

  const handleAddBlog = blog => {
    blogFormRef.current.toggleVisibility()

    blogService.create(blog)
      .then(newBlog => {
        setBlogs(blogs => [...blogs, { ...newBlog, user }])
        createNotification(`A new blog: "${newBlog.title}" by ${user.name} added`)
      })
      .catch(error => {
        console.error(error)
        const { error: errorMessage } = error.response.data
        createNotification(errorMessage, 'red')
      })
  }

  const handleLikeToBlog = async blog => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      const updatedBlog = await blogService.update(newBlog)

      setBlogs(blogs => blogs.map(blogInState => {
        if (blogInState.id === blog.id) return updatedBlog
        return blogInState
      }))

      createNotification('Blog liked!')
    } catch (error) {
      console.error(error)
      const { error: errorMessage } = error.response.data
      createNotification(errorMessage, 'red')
    }
  }

  const handleDeleteBlog = ({ id, title, author }) => {
    const userConfirmation = window.confirm(`Remove blog: "${title}" by ${author}?`)
    if (!userConfirmation) return

    blogService
      .delete(id)
      .then(() => {
        setBlogs(blogs => blogs.filter(blog => blog.id !== id))
        createNotification('Blog deleted')
      })
      .catch(error => {
        console.error(error)
        const { error: errorMessage } = error.response.data
        createNotification(errorMessage, 'red')
      })
  }

  const createNotification = (message = 'Unexpected error', color = 'green') => {
    setNotification({ message, color })
    setTimeout(() => {
      setNotification(notification => notification && notification.message === message
        ? null
        : notification
      )
    }, 5000)
  }

  if (!user) return (
    <div>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <LoginForm handleLogin={handleLogin} />
    </div>
  )

  return (
    <div>
      <section>
        <h2>blogs</h2>
        <Notification notification={notification} />
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        {blogsSorted.map(blog =>
          <Blog
            blog={blog}
            user={user.username}
            handleLike={handleLikeToBlog}
            handleDelete={handleDeleteBlog}
            key={blog.id}
          />
        )}
      </section>
      <section>
        <h2>create new</h2>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm handleAddBlog={handleAddBlog} />
        </Togglable>
      </section>
    </div>
  )
}

export default App
