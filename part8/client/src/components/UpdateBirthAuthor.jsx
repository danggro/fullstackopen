import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const UpdatedBirthAuthor = ({ authorsName }) => {
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthor }) => {
        const authorUpdate = response.data.editAuthor
        return {
          allAuthor: allAuthor.map((a) =>
            a.name !== authorUpdate.name ? a : authorUpdate
          ),
        }
      })
    },
  })

  const submit = (e) => {
    e.preventDefault()
    const name = e.target.name.value

    editAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setBorn('')
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select name="name">
          {authorsName.map((name) => {
            return (
              <option value={name} key={name}>
                {name}
              </option>
            )
          })}
        </select>

        <div>
          born{' '}
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}
export default UpdatedBirthAuthor
