import BlogForm from './BlogForm'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import ListBlog from './ListBlog'
import { useUserValue } from '../context/UserContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotifReducer } from '../context/NotifContext'
import styled from 'styled-components'

const ContainerListBlog = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`

const Home = () => {
  const user = useUserValue()
  const queryClient = useQueryClient()
  const notif = useNotifReducer()

  const blogAddMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: async (data) => {
      const blogs = await blogService.getAll()
      queryClient.setQueryData(['blogs'], blogs)
      notif.set(`a new blog ${data.title} by ${data.author} added`, false)
    },
    onError: (error) => {
      notif.set('title or url missing', true)
    },
  })

  const addBlog = (data) => {
    blogAddMutation.mutate(data)
  }

  const blogForm = () => (
    <Togglable buttonLabel={'New Blog'}>
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          {blogForm()}
          <ContainerListBlog>
            <ListBlog />
          </ContainerListBlog>
        </div>
      )}
    </div>
  )
}

export default Home
