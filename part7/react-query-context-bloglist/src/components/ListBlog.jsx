import { useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'

const ListBlog = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])

  return (
    <>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default ListBlog
