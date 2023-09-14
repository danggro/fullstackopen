import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      return state.map((a) =>
        a.id !== anecdote.id ? a : { ...anecdote, votes: anecdote.votes + 1 }
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, setAnecdotes, vote } = anecdoteSlice.actions

export const initializeAnedotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addNewAnecdote = (content) => {
  return async (dispatch) => {
    const response = await anecdotesService.newAnecdote(content)
    dispatch(appendAnecdote(response))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdotes = getState().anecdotes
    const anecdote = anecdotes.find((a) => a.id === id)
    const data = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await anecdotesService.voteAnecdoteService(data)
    dispatch(vote(response.id))
  }
}
export default anecdoteSlice.reducer
