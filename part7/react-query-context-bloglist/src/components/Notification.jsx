import { useNotifValue } from '../context/NotifContext'

const Notification = () => {
  const notification = useNotifValue()

  if (notification.text === '') {
    return null
  }

  return (
    <div className={notification.error ? 'error' : 'success'}>
      {notification.text}
    </div>
  )
}

export default Notification
