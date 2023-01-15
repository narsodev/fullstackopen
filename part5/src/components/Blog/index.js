import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const navigate = useNavigate()

  const handleDeleteClick = () => {
    if (handleDelete(blog)) navigate('/')
  }

  if (!blog) return null

  const userIsOwner = user.id === blog.user.id

  return (
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <div>
        <div>url: <a href={blog.url}>{blog.url}</a></div>
        <div>
          {blog.likes} likes
          <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>added by {blog.user ? blog.user.name : 'anonymous'}</div>
        { userIsOwner && <button onClick={handleDeleteClick}>remove</button> }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.instanceOf(null)
  ]),
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog