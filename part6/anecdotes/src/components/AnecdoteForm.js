import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { create } from '../services/anecdotes'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')
  const dispatch = useDispatch()

  const handleChange = event => {
    setAnecdote(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const newAnecdote = await create(anecdote)

    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`anecdote '${newAnecdote.content}' created`))
    setAnecdote('')
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input value={anecdote} onChange={handleChange} /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
