import { useState } from 'react'

export default function Comments ({ comments = [], onAddComment }) {
  const [comment, setComment] = useState('')

  const handleChange = event => {
    setComment(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    onAddComment(comment)
    setComment('')
  }

  return (
    <section>
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input required type="text" value={comment} onChange={handleChange} />
        <button>add comment</button>
      </form>
      {comments.length === 0 && <p>No comments yet</p>}
      <ul>
        {comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </section>
  )
}