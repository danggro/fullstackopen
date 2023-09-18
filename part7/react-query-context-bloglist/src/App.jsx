import './index.css'
import blogService from './services/blogs'
import usersService from './services/users'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Home from './components/Home'
import DetailBlog from './components/DetailBlog'
import { useQuery } from '@tanstack/react-query'
import { Route, Routes } from 'react-router-dom'
import { useUserReducer, useUserValue } from './context/UserContext'
import { BlogContextProvider } from './context/BlogContext'
import { useEffect } from 'react'
import styled from 'styled-components'
import Navigation from './components/Navigation'

const Container = styled.div`
  width: 75%;
  margin: auto;
  background: paleturquoise;
`

const ContainerMain = styled.div`
  padding: 2rem 2rem 2rem 2rem;
`

const App = () => {
  const handleUser = useUserReducer()
  const user = useUserValue()
  useEffect(() => {
    if (!user) {
      handleUser.get()
    }
  }, [])

  const resultBlog = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    refetchOnWindowFocus: false,
  })

  const resultUsers = useQuery({
    queryKey: ['users'],
    queryFn: () => usersService.getAll(),
    refetchOnWindowFocus: false,
  })

  if (resultBlog.isLoading || resultUsers.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <Container>
      <Navigation />
      <ContainerMain>
        <h1 style={{ color: 'darkslategrey', marginTop: '0' }}>Blogs</h1>
        <Notification />
        <BlogContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<DetailBlog />} />
          </Routes>
        </BlogContextProvider>
      </ContainerMain>
    </Container>
  )
}

export default App
