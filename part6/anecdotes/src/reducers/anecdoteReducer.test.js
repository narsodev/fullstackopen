import deepFreeze from 'deep-freeze'
import anecdoteReducer, { initialState } from './anecdoteReducer'

describe('anecdotes reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })
})
