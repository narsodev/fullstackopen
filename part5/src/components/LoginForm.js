const LoginForm = ({ username, handleUsernameChange, password, handlePasswordChange, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
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