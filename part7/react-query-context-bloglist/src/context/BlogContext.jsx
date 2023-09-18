import { useContext } from 'react'
import { useReducer } from 'react'
import { createContext } from 'react'

const blogReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.payload)
    default:
      return []
  }
}

const BlogContext = createContext()

export const useBlogValue = () => {
  const blogAndDispatch = useContext(BlogContext)
  return blogAndDispatch[0]
}

export const useBlogDispatch = () => {
  const blogAndDispatch = useContext(BlogContext)
  return blogAndDispatch[1]
}

export const BlogContextProvider = (props) => {
  const [blog, blogDispatch] = useReducer(blogReducer, [])
  return (
    <BlogContext.Provider value={[blog, blogDispatch]}>
      {props.children}
    </BlogContext.Provider>
  )
}

export default BlogContext
