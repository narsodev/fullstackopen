import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import { login } from './services/login'

import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import { Route, Routes, useMatch } from 'react-router-dom'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import User from './components/User'
import usersService from './services/users'
import Navigation from './components/Navigation'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [blogsSorted, setBlogsSorted] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const [users, setUsers] = useState([])
  const match = useMatch('/users/:id')
  const userViewing = match ? users.find(user => user.id === match.params.id) : null

  useEffect(() => {
    usersService.getAll()
      .then(setUsers)
  }, [])


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

  const handleAddBlog = async blog => {
    blogFormRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs => [...blogs, { ...newBlog, user }])
      createNotification(`A new blog: "${newBlog.title}" by ${user.name} added`)
      setUsers(users => users.map(userInState => {
        console.log(user, userInState)
        if (userInState.id === user.id) {
          return {
            ...userInState,
            blogs: [...userInState.blogs, newBlog]
          }
        }
        return userInState
      }))
    } catch (error) {
      console.error(error)
      const { error: errorMessage } = error.response.data
      createNotification(errorMessage, 'red')
    }
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
        setUsers(users => users.map(userInState => {
          if (userInState.id === user.id) {
            return {
              ...userInState,
              blogs: userInState.blogs.filter(blog => blog.id !== id)
            }
          }
          return userInState
        }))
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
      <Navigation user={user} handleLogout={handleLogout} />
      <h1>blogs</h1>
      <Notification notification={notification} />
      <Routes>
        <Route path='/' element={
          <>
            <section>
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
          </>
        }>
        </Route>
        <Route path='/users' element={ <Users users={users} /> }>
        </Route>
        <Route path='/users/:id' element={ <User user={userViewing} /> } />
      </Routes>
    </div>
  )
}

export default App
