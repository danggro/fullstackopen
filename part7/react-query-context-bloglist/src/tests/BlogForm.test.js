import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> create a new blog', async () => {
  const addBlog = jest.fn()

  const { container } = render(<BlogForm addBlog={addBlog} />)

  const inputTitle = container.querySelector('#input-title')
  const inputAuthor = container.querySelector('#input-author')
  const inputUrl = container.querySelector('#input-url')

  const sendButton = screen.getByText('Create Blog')

  await userEvent.type(inputTitle, 'this is Title')
  await userEvent.type(inputAuthor, 'this is Author')
  await userEvent.type(inputUrl, 'this is Url')
  await userEvent.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('this is Title')
  expect(addBlog.mock.calls[0][0].author).toBe('this is Author')
  expect(addBlog.mock.calls[0][0].url).toBe('this is Url')
})
