import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const userIsOwner = user === blog.user.username

  const handleDetailsVisibilityChange = () => setDetailsVisible(visible => !visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button type='button' onClick={handleDetailsVisibilityChange}>
        { detailsVisible ? 'hide' : 'view' }
      </button>
      { detailsVisible &&
        <div>
          <div>url: {blog.url}</div>
          <div>
              likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>user: {blog.user ? blog.user.name : 'anonymous'}</div>
          { userIsOwner && <button onClick={() => handleDelete(blog)}>remove</button> }
        </div>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog