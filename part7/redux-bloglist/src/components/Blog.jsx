import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addCommentBlog,
  addLikeBlog,
  deleteBlog,
} from '../reducers/blogReducer'
import { useState } from 'react'
import styled from 'styled-components'

const Content = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 0.25rem;
  font-size: 1.125rem;
  color: darkslategrey;
  a {
    color: darkslategrey;
    &:hover {
      color: white;
    }
  }
`

const Button = styled.button`
  padding: 0.25rem 0.5rem;
  background: darkslategrey;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  &:hover {
    opacity: 80%;
  }
`

const Input = styled.input`
  padding: 0.25rem 0.5rem;
  outline: none;
  border: none;
  margin-right: 0.25rem;
  &:focus {
    outline: darkslategrey solid;
  }
`

const Blog = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blog = blogs.find((b) => b.id === params.id)
  const [comment, setComment] = useState('')

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog.id))
      navigate('/')
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1 style={{ color: 'darkslategrey' }}>{blog.title}</h1>
      <Content>
        <li>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </li>
        <li>
          {blog.likes} likes{' '}
          <Button onClick={() => dispatch(addLikeBlog(blog))}>like</Button>
        </li>
        <li>added by {blog.user.name}</li>
        <li>
          {user.name === blog.user.name && (
            <Button onClick={() => handleDeleteBlog(blog)}>remove</Button>
          )}
        </li>
      </Content>
      <div>
        <p>
          <strong>Comments</strong>
        </p>
        <Input
          type="text"
          onChange={({ target }) => setComment(target.value)}
          value={comment}
        />
        <Button onClick={() => dispatch(addCommentBlog(blog, comment))}>
          add comment
        </Button>
        <ul>
          {blog.comments.map((comm, i) => {
            return <li key={i}>{comm}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Blog
