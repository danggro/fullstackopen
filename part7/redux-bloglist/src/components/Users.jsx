import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
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

const Table = styled.table`
  tr,
  td,
  th {
    border: 1px solid;
    padding: 0.25rem;
    text-align: center;
  }

  border-collapse: collapse;
`

const Users = () => {
  const users = useSelector((state) => state.allUser)
  if (users.length === 0) {
    return null
  }

  return (
    <Container>
      <h1>Users</h1>
      <Table>
        <thead>
          <tr>
            <td>
              <strong>User</strong>
            </td>
            <td>
              <strong>Blogs Created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.username}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default Users
