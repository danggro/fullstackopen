import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog, getAllBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'
import styled from 'styled-components'

const Button = styled.button`
  font-size: 0.8rem;
  padding: 0.5rem;
  background: darkslategrey;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  width: fit-content;
  &:hover {
    opacity: 80%;
  }
`

const Form = styled.form`
  margin-bottom: 1rem;
  font-size: 1.125rem;
`

const Input = styled.input`
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  border: none;
  font-size: 1rem;
  &:focus {
    outline: darkslategrey solid;
  }
`

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const data = { title, author, url }
    try {
      await dispatch(addBlog(data))
      dispatch(getAllBlog())
      dispatch(
        setNotification(
          `a new blog ${data.title} by ${data.author} added`,
          false
        )
      )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      if (error.response.status) {
        dispatch(setNotification('title or url missing', true))
      }
    }
  }

  return (
    <Form onSubmit={handleAddBlog}>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>
              :{' '}
              <Input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
                id="input-title"
              />
            </td>
          </tr>
          <tr>
            <td>Author</td>
            <td>
              :{' '}
              <Input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
                id="input-author"
              />
            </td>
          </tr>
          <tr>
            <td>Url</td>
            <td>
              :{' '}
              <Input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
                id="input-url"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Button type="submit">Create Blog</Button>
    </Form>
  )
}

export default BlogForm
