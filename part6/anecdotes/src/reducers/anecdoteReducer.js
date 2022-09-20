const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdote = id => (
  {
    type: 'VOTE',
    data: { id }
  }
)

export const createAnecdote = anecdote => (
  {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote,
      votes: 0,
      id: getId()
    }
  }
)

const actions = {
  VOTE: (state, data) => {
    const { id } = data

    return state.map(anecdote => {
      if (anecdote.id === id) {
        const votes = anecdote.votes + 1
        return { ...anecdote, votes }
      }
      return anecdote
    })
  },
  NEW_ANECDOTE: (state, data) => ([...state, data])
}

const reducer = (state = initialState, action) => {
  const { type, data } = action

  const newState = actions[type]?.(state, data) || state
  return newState
}

export default reducer
