import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../../services/users'

export default function Users () {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll()
      .then(setUsers)
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}