import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
        </div>
      }
    </div>    
  )
}
export default Blog