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

    setTitle('')
    setAuthor('')
    setUrl('')
    handleAddBlog({ title, author, url })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title <input
            type="text"
            onChange={handleTitleChange}
            value={title}
            placeholder='Title'
            required
          />
        </label>
      </div>
      <div>
        <label>
          author <input
            type="text"
            onChange={handleAuthorChange}
            value={author}
            placeholder='Author'
            required
          />
        </label>
      </div>
      <div>
        <label>
          url <input
            type="text"
            onChange={handleUrlChange}
            value={url}
            placeholder='Url'
            required
          />
        </label>
      </div>
      <button type="submit">create blog</button>
    </form>
  )
}

export default BlogForm