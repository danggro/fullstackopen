import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useUserReducer, useUserValue } from '../context/UserContext'

const NavBar = styled.nav`
  background: darkslategrey;
  font-size: 1em;
  padding: 1em 1.5em;
  color: white;
`
const Button = styled.button`
  font-size: 0.9em;
  font-weight: 600;
  padding: 0.25em 0.5em;
  background: white;
  cursor: pointer;
  &:hover {
    opacity: 80%;
  }
`

const NavbarLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const Navigation = () => {
  const handleUser = useUserReducer()
  const user = useUserValue()

  const handleLogout = () => {
    handleUser.clear()
  }

  if (!user) {
    return null
  }

  return (
    <NavBar>
      <NavbarLink to={'/'} className="link">
        Blogs{' '}
      </NavbarLink>
      <NavbarLink to={'/users'}>Users </NavbarLink>
      {user.name} logged in <Button onClick={handleLogout}>Logout</Button>
    </NavBar>
  )
}

export default Navigation
