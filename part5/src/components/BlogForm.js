import { useState } from 'react'

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    handleAddBlog({ title, author, url })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title <input type="text" onChange={handleTitleChange} />
        </label>
      </div>
      <div>
        <label>
          author <input type="text" onChange={handleAuthorChange} />
        </label>
      </div>
      <div>
        <label>
          url <input type="text" onChange={handleUrlChange}/>
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm