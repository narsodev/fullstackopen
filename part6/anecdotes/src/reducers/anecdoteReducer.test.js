import deepFreeze from 'deep-freeze'
import anecdoteReducer, { initialState, createAnecdote } from './anecdoteReducer'

describe('anecdotes reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('votes of anecdote are incremented', () => {
    const anecdoteToVote = initialState[0]

    const action = {
      type: 'VOTE',
      data: { id: anecdoteToVote.id }
    }

    const state = initialState
    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(state.length)

    expect(newState).toContainEqual(state[1])
    expect(newState).toContainEqual({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    })
  })

  test('a new anecdote can be added', () => {
    const newAnecdote = 'I do not know how to code'

    const state = []
    deepFreeze(state)

    const newState = anecdoteReducer(state, createAnecdote(newAnecdote))
    expect(newState).toHaveLength(1)

    const anecdoteAdded = newState.find(anecdote => anecdote.content === newAnecdote)
    expect(anecdoteAdded).toBeTruthy()
    expect(anecdoteAdded).toHaveProperty('id')
    expect(anecdoteAdded).toHaveProperty('votes', 0)
  })
})
