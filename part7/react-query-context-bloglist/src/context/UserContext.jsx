import { createContext, useContext, useReducer } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state, action) => {
  const user = action.payload
  switch (action.type) {
    case 'SET':
      return user
    case 'CLEAR':
      return null
    default:
      return null
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const useUserReducer = () => {
  const dispatch = useUserDispatch()

  const set = async (credentials) => {
    const data = await loginService.login(credentials)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(data))
    dispatch({ type: 'SET', payload: data })
  }

  const get = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch({ type: 'SET', payload: user })
      blogService.setToken(user.token)
    }
  }

  const clear = () => {
    window.localStorage.clear()
    dispatch({ type: 'CLEAR', payload: {} })
  }
  return { get, clear, set }
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContext
