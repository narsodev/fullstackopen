import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    handleLogin(username, password)
  }

  return (
    <form onSubmit={handleSubmit} id='login-form'>
      <div>
        <label>
          username
          <input type="text" id='username' value={username} onChange={handleUsernameChange}/>
        </label>
      </div>
      <div>
        <label>
          password
          <input type="password" id='password' value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

export default LoginForm