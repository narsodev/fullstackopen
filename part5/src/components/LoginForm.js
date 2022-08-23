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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          username
          <input type="text" value={username} onChange={handleUsernameChange}/>
        </label>
      </div>
      <div>
        <label>
          password
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm