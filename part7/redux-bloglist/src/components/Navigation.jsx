import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleLogout } from '../reducers/userReducer'
import styled from 'styled-components'

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
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  if (!user) {
    return null
  }

  return (
    <NavBar>
      <NavbarLink to={'/'} className="link">
        Blogs{' '}
      </NavbarLink>
      <NavbarLink to={'/users'}>Users </NavbarLink>
      {user.name} logged in{' '}
      <Button onClick={() => dispatch(handleLogout())}>Logout</Button>
    </NavBar>
  )
}

export default Navigation
