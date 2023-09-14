import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import {
  addNotification,
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((a) => a.content.includes(state.filter))
    }
    return state.anecdotes
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    notification(id)
  }

  const notification = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }
  return (
    <>
      {anecdotes
        .toSorted((a, b) => {
          return b.votes - a.votes
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
