import { createContext, useContext, useReducer } from 'react'

const notifReducer = (state, action) => {
  const text = action.payload.text
  const error = action.payload.error
  switch (action.type) {
    case 'SET':
      return { text, error }
    case 'CLEAR':
      return { text: '', error: true }
    default:
      return { text: '', error: true }
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

export const useNotifReducer = () => {
  const dispatch = useNotifDispatch()

  const set = (text, error) => {
    dispatch({ type: 'SET', payload: { text, error } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR', payload: {} })
    }, 3000)
  }

  return { set }
}

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, {
    text: '',
    error: true,
  })

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext
