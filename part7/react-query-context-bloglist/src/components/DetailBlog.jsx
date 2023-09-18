import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useUserValue } from '../context/UserContext'
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

const DetailBlog = () => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()
  const params = useParams()

  const blogs = queryClient.getQueryData(['blogs'])
  const blog = blogs.find((u) => u.id === params.id)

  const user = useUserValue()
  const navigate = useNavigate()

  const blogDeleteMutation = useMutation(blogService.deleteBlog)

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogDeleteMutation.mutate(blog.id, {
        onSuccess: () => {
          queryClient.setQueryData(
            ['blogs'],
            blogs.filter((b) => b.id !== blog.id)
          )
          navigate('/')
        },
      })
    }
  }

  const addLikesMutation = useMutation(blogService.addLikes, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id !== data.id ? b : { ...b, likes: data.likes }))
      )
    },
  })

  const handleAddLikes = (blog) => {
    const editedBlog = { ...blog, likes: blog.likes + 1 }
    addLikesMutation.mutate(editedBlog)
  }

  const addCommentMutation = useMutation(blogService.addComment, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) =>
          b.id !== params.id
            ? b
            : { ...b, comments: [...b.comments, data.comment] }
        )
      )
    },
  })

  const handleAddComment = () => {
    addCommentMutation.mutate({ comment, id: params.id })
  }

  return (
    <div>
      <h2 style={{ color: 'darkslategrey' }}>
        {blog.title} by {blog.author}
      </h2>
      <Content>
        <li>
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </li>
        <li>
          {blog.likes} likes{' '}
          <Button onClick={() => handleAddLikes(blog)}>Like</Button>
        </li>
        <li>Added by {blog.user.name}</li>
        {user.name === blog.user.name && (
          <Button onClick={() => handleDeleteBlog(blog)}>remove</Button>
        )}
      </Content>
      <div>
        <p>
          <strong>Comments</strong>
        </p>
        <Input
          type="text"
          onChange={(event) => setComment(event.target.value)}
          value={comment}
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
        <ul>
          {blog.comments.map((comment, index) => {
            return <li key={index}>{comment}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default DetailBlog
