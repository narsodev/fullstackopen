import './index.css'

const Notification = ({ notification }) => {
  if (!notification)
    return null

  const { message, color } = notification
  return (
    <div className='notification' style={{ color }}>
      {message}
    </div>
  )
}

export default Notification