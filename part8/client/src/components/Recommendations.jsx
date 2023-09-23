import { useQuery } from '@apollo/client'
import { CURRENT_USER, FIND_BOOKS_BY_GENRE } from '../queries'

const Recommendations = ({ show }) => {
  const user = useQuery(CURRENT_USER)

  const genre =
    !user.loading && user.data.me ? user.data.me.favoriteGenre : null

  const findBooksByGenre = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })
  const books =
    !findBooksByGenre.loading && findBooksByGenre.data
      ? findBooksByGenre.data.allBook
      : []

  if (!show) {
    return null
  }
  if (user.loading || findBooksByGenre.loading) {
    return <>loading...</>
  }
  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{genre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
