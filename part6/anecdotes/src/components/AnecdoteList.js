import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = id => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
  }

  const filteredAnecdotes = anecdotes.filter(
    anecdote => anecdote.content
      .toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      {filteredAnecdotes.map(anecdote =>
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
    </>
  )
}

export default AnecdoteList
