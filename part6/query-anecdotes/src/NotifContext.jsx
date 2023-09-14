import { createContext, useContext, useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return null
  }
}

const NotifContext = createContext()

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[1]
}

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, null)

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext
