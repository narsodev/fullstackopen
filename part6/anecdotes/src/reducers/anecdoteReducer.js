import { createSlice } from '@reduxjs/toolkit'

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

export const { voteAnecdote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer
