import { Link } from 'react-router-dom'

export default function Navigation ({ user, handleLogout }) {
  return (
    <nav style={{
      display: 'flex',
      gap: '1rem',
    }}>
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </nav>
  )
}