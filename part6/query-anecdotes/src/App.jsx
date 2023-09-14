import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './requests'
import { useNotifDispatch } from './NotifContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotifDispatch()

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: (data) => {
      const query = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        query.map((a) => (a.id !== data.id ? a : data))
      )
      dispatch({ type: 'SET', payload: `anecdote '${data.content} voted'` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR' })
      }, 4000)
    },
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  })

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
