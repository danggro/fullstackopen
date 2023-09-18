import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

let container
let addLikes
beforeEach(() => {
  const blog = {
    title: 'this is title',
    author: 'this is author',
    url: 'this is url',
    likes: 10,
    user: {
      name: 'anlang',
    },
  }

  addLikes = jest.fn()
  deleteBlog = jest.fn()

  container = render(
    <Blog blog={blog} addLikes={addLikes} deleteBlog={deleteBlog} />
  ).container
})

test('should renders content', () => {
  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('this is title this is author')
})

test('after click view button url and likes are displayed', async () => {
  const div = container.querySelector('.blog')
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(div).toHaveTextContent('this is url 10')
})

test('after click like button twice event handler called twice', async () => {
  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(addLikes.mock.calls).toHaveLength(2)
})
