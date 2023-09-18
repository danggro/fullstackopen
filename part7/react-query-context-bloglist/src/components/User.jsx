import { useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  color: darkslategrey;
  a {
    color: darkslategrey;
    &:hover {
      color: white;
    }
  }
`

const User = () => {
  const queryClient = useQueryClient()
  const params = useParams()
  const users = queryClient.getQueryData(['users'])
  const user = users.find((u) => u.id === params.id)

  return (
    <Container>
      <h2>{user.name}</h2>
      <p>
        <strong>Added Blogs</strong>
      </p>
      <ul>
        {user.blogs.map((blog) => {
          return (
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default User
