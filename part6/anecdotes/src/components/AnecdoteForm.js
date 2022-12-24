import { useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const [anecdote, setAnecdote] = useState('')

  const handleChange = event => {
    setAnecdote(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    createAnecdote(anecdote)
    setNotification(`anecdote '${anecdote}' created`)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
