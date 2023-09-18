import { useNotifDispatch } from '../context/NotifContext'

export const useNotif = () => {
  const dispatch = useNotifDispatch()

  const set = (text, error) => {
    dispatch({ type: 'SET', payload: { text, error } })
    setTimeout(() => {
      dispatch({ type: 'CLEAR', payload: {} })
    }, 3000)
  }

  return { set }
}
