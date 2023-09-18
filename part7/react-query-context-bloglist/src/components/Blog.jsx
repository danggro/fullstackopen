import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BlogLink = styled(Link)`
  font-size: 1.25rem;
  text-decoration: none;
  color: darkslategrey;
  &:hover {
    color: white;
  }
`

const ContainerBlog = styled.div`
  border: 1px solid darkslategrey;
  padding: 0.5rem;
`
const Blog = ({ blog }) => {
  return (
    <ContainerBlog className="blog">
      <BlogLink to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </BlogLink>
    </ContainerBlog>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default Blog
