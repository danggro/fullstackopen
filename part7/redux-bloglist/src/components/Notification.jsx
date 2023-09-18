import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notif = useSelector((state) => state.notif)
  if (notif.text === '') {
    return null
  }

  return <div className={notif.error ? 'error' : 'success'}>{notif.text}</div>
}

export default Notification
