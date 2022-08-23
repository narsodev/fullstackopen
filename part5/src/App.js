import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
      })
      .catch(error => console.error(error.response.data.error))
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const handleAddBlog = blog => {
    blogService.create(blog)
      .then(newBlog => {
        setBlogs(blogs => [newBlog, ...blogs])
      })
      .catch(error => console.error(error.response.data.error))
  }
  
  if (!user) return (
    <div>
      <h2>log in to application</h2>
      <LoginForm handleLogin={handleLogin} />
    </div>
  )

  return (
    <div>
      <section>
        <h2>blogs</h2>
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
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
