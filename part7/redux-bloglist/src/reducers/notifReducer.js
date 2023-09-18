import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  initialState: { text: '', error: true },
  reducers: {
    addNotif(state, action) {
      const { text, error } = action.payload
      return { text, error }
    },
    clearNotif(state, action) {
      return { text: '', error: true }
    },
  },
})

export const setNotification = (text, error) => {
  return (dispatch) => {
    dispatch(addNotif({ text, error }))
    setTimeout(() => {
      dispatch(clearNotif())
    }, 3000)
  }
}

export const { addNotif, clearNotif } = notifSlice.actions
export default notifSlice.reducer
