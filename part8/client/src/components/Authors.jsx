import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import UpdatedBirthAuthor from './UpdateBirthAuthor'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading || !result.data) {
    return <>loading ...</>
  }
  const authors = result.data.allAuthor

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdatedBirthAuthor authorsName={authors.map((a) => a.name)} />
    </div>
  )
}

export default Authors
