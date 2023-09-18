import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Blog = styled(Link)`
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

const ListBlog = ({ blog }) => {
  return (
    <ContainerBlog className="blog">
      <Blog to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Blog>
      <br />
    </ContainerBlog>
  )
}

ListBlog.propTypes = {
  blog: PropTypes.object.isRequired,
}
export default ListBlog
