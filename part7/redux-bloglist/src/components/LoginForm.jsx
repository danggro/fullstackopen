import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/userReducer'
import { setNotification } from '../reducers/notifReducer'
import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  margin: 0.5rem 0;
  &:focus {
    outline: darkslategrey solid;
  }
`

const Label = styled.span`
  font-size: 1.25rem;
`

const Button = styled.button`
  font-size: 0.825rem;
  padding: 0.5rem 0.75rem;
  background: darkslategrey;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  &:hover {
    opacity: 80%;
  }
`

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault()
    try {
      await dispatch(handleLogin({ username, password }))
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification(`wrong username or password`, true))
    }
  }

  return (
    <form onSubmit={login}>
      <div>
        <Label>Username</Label>
        <br />
        <Input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="input-username"
        />
      </div>
      <div>
        <Label>Password</Label>
        <br />
        <Input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="input-password"
        />
      </div>
      <Button type="submit">Login</Button>
    </form>
  )
}

export default LoginForm
