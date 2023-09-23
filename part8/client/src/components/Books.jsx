import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS, FIND_BOOKS_BY_GENRE } from '../queries'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [allGenre, setAllGenre] = useState([])
  const client = useApolloClient()
  const allBooks = useQuery(ALL_BOOKS)

  const findBooksByGenre = useQuery(FIND_BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  const cache = client.readQuery({ query: ALL_BOOKS })
  const bookCache = cache ? cache.allBook : []

  const result = !genre ? allBooks : findBooksByGenre

  const books = result.data && !result.loading ? result.data.allBook : []

  useEffect(() => {
    const genres = bookCache
      .map((b) => b.genres)
      .reduce((a, b) => a.concat(b), [])
    const genresFiltered = genres.filter(
      (genre, index) => genres.findIndex((f) => f === genre) === index
    )
    setAllGenre(genresFiltered)
  }, [bookCache.length])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <>loading ...</>
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong>{genre ? genre : 'all genre'}</strong>
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
      {allGenre.map((genre) => {
        return (
          <span key={genre}>
            <button onClick={() => setGenre(genre)}>{genre}</button>
          </span>
        )
      })}
      <button onClick={() => setGenre(null)}>all genre</button>
    </div>
  )
}

export default Books
