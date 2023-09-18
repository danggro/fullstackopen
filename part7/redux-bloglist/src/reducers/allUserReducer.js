import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const allUserSlice = createSlice({
  name: 'allUser',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const getAllUser = () => {
  return async (dispatch) => {
    const response = await userService.getAll()
    dispatch(setUsers(response))
  }
}

export const { setUsers } = allUserSlice.actions
export default allUserSlice.reducer
