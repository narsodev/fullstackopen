export default function User ({ user }) {
  if (!user) return 'user not found'

  return (
    <section>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.length === 0
        ? <p>no blogs found</p>
        : <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      }
    </section>
  )
}