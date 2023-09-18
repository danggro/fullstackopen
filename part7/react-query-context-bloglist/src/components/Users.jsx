import { useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  const users = queryClient.getQueryData(['users'])
  return (
    <Container>
      <h2>Users</h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
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
