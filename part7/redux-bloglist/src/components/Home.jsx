import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import ListBlog from './ListBlog'
import styled from 'styled-components'

const ContainerListBlog = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`

const Home = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  const blogForm = () => (
    <Togglable buttonLabel={'New Blog'}>
      <BlogForm />
    </Togglable>
  )

  const blogsView = () => (
    <ContainerListBlog>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <ListBlog key={blog.id} blog={blog} />
        ))}
    </ContainerListBlog>
  )

  return (
    <>
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          {blogForm()}
          {blogsView()}
        </div>
      )}
    </>
  )
}

export default Home
