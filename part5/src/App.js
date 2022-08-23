import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const handleLogin = (username, password) => {
    login({ username, password })
      .then(user => {
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        createNotification(`Logged as ${username}`)
      })
      .catch(error => {
        const { error: errorMessage } = error.response.data
        console.error(errorMessage)
        createNotification(errorMessage, 'red')
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    createNotification(`Logged out`)
  }

  const handleAddBlog = blog => {
    blogService.create(blog)
      .then(newBlog => {
        setBlogs(blogs => [newBlog, ...blogs])
        createNotification(`A new blog: "${newBlog.title}" by ${user.name} added`)
      })
      .catch(error => {
        const { error: errorMessage } = error.response.data
        console.error(errorMessage)
        createNotification(errorMessage, 'red')
      })
  }

    const createNotification = (message = '', color = 'green') => {
    setNotification({ message, color })
    setTimeout(() => {
      setNotification(notification => notification?.message === message
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </section>
      <section>
        <h2>create new</h2>
        <BlogForm handleAddBlog={handleAddBlog} />
      </section>
    </div>
  )
}

export default App
