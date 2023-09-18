import { useSelector } from 'react-redux'
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
  const params = useParams()
  const users = useSelector((state) => state.allUser)
  const user = users.find((u) => u.id === params.id)

  if (users.length === 0) {
    return null
  }

  return (
    <Container>
      <h1>{user.name}</h1>
      <p>
        <strong>Added Blogs</strong>
      </p>
      <ul>
        {user.blogs.map((b) => {
          return (
            <li key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default User
