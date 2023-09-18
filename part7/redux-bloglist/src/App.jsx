import './index.css'
import { useEffect } from 'react'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { getAllBlog } from './reducers/blogReducer'
import { setInitialUser } from './reducers/userReducer'
import Users from './components/Users'
import { getAllUser } from './reducers/allUserReducer'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import styled from 'styled-components'

const Container = styled.div`
  width: 75%;
  margin: auto;
  background: paleturquoise;
`

const ContainerMain = styled.div`
  padding: 2rem 2rem 2rem 2rem;
`

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setInitialUser())
    dispatch(getAllUser())
    dispatch(getAllBlog())
  }, [])

  return (
    <Container>
      <Navigation />
      <ContainerMain>
        <h1 style={{ color: 'darkslategrey', margin: '0 0 1rem 0' }}>
          Blog App
        </h1>
        <Notification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      </ContainerMain>
    </Container>
  )
}

export default App
