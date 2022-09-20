import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const [anecdote, setAnecdote] = useState('')
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleChange = event => {
    setAnecdote(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    dispatch(createAnecdote(anecdote))
    setAnecdote('')
  }

  const vote = id => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      <div><input value={anecdote} onChange={handleChange} /></div>
      <button>create</button>
    </form>
    </div>
  )
}

export default App
