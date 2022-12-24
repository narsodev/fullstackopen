import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { getAll } from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAll().then(anecdotes => {
      dispatch(setAnecdotes(anecdotes))
    })
  }, [dispatch])

  return (
    <>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </>
  )
}

export default App
