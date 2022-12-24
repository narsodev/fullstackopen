import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification (state, action) {
      return action.payload
    },
    clearNotification () {
      return ''
    }
  }
})

export const { clearNotification } = notificationSlice.actions

let timeoutId

export const setNotification = (message, time = 5000) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch(notificationSlice.actions.setNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export default notificationSlice.reducer
