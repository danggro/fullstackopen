import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLikes, deleteBlog, user }) => {
  const [detail, setDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}{' '}
      <button onClick={() => setDetail(!detail)}>
        {detail ? 'hide' : 'view'}{' '}
      </button>
      <br />
      {detail === true ? (
        <>
          {blog.url} <br />
          {blog.likes}{' '}
          <button onClick={async () => await addLikes(blog.id)}>like</button>
          <br /> {blog.user.name} <br />
          {user.name === blog.user.name && (
            <button onClick={async () => await deleteBlog(blog.id)}>
              remove
            </button>
          )}
        </>
      ) : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}
export default Blog
