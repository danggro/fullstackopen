import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const setInitialUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const handleLogin = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const handleLogout = () => {
  return (dispatch) => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
