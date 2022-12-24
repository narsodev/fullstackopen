import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')
  const dispatch = useDispatch()

  const handleChange = event => {
    setAnecdote(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`anecdote '${anecdote}' created`))
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
