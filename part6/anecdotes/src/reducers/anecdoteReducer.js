import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload

      const stateVoted = state.map(anecdote => {
        if (anecdote.id === id) {
          const votes = anecdote.votes + 1
          return { ...anecdote, votes }
        }
        return anecdote
      })

      const stateOrdered = stateVoted.sort((a, b) => b.votes - a.votes)
      return stateOrdered
    },
    createAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content, votes) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content, votes)
    dispatch(anecdoteSlice.actions.createAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer
