import { useState } from 'react'
import { useNotif } from '../hooks'
import { useUserReducer } from '../context/UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notif = useNotif()
  const useUser = useUserReducer()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await useUser.set({ username, password })
    } catch (error) {
      notif.set('Username or password not found', true)
    }

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          id="input-username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          id="input-password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
