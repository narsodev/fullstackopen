import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const timer = useRef()

  useEffect(() => {
    timer.current = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    return () => clearTimeout(timer)
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
