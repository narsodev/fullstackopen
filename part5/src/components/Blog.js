import { useState } from "react"

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
    <div style={blogStyle}>
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
            <div>user: {blog.user?.name || 'anonymous'}</div>
            { userIsOwner && <button onClick={() => handleDelete(blog.id)}>remove</button> }
        </div>
      }
    </div>    
  )
}
export default Blog