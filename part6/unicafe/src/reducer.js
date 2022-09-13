const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const actions = {
  GOOD: state => ({ ...state, good: state.good + 1}),
  OK: state => ({ ...state, ok: state.ok + 1}),
  BAD: state => ({ ...state, bad: state.good + 1}),
  ZERO: () => initialState
}

const counterReducer = (state = initialState, action) => {
  const { type } = action
  
  const newState = actions[type]?.(state) || initialState

  return newState
}
export default counterReducer