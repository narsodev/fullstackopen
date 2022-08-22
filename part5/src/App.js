import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { login } from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleLogin = event => {
    event.preventDefault()

    login({ username, password })
      .then(setUser)
      .catch(error => console.error(error.response.data.error))
  }
  
  if (!user) return (
    <div>
      <h2>log in to application</h2>
      <LoginForm 
          username={username}
          handleUsernameChange={handleUsernameChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
     />
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
