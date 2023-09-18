import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLikeBlog(state, action) {
      const object = action.payload
      return state.map((b) =>
        b.id !== object.id ? b : { ...object, likes: object.likes + 1 }
      )
    },
    deleteBlogRed(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
    addComment(state, action) {
      const blog = action.payload.blog
      const comment = action.payload.comment
      return state.map((b) =>
        b.id !== blog.id
          ? b
          : { ...blog, comments: blog.comments.concat(comment) }
      )
    },
  },
})

export const getAllBlog = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    dispatch(setBlogs(response))
  }
}

export const addBlog = (object) => {
  return async (dispatch) => {
    const response = await blogService.create(object)
    dispatch(appendBlog(response))
  }
}

export const likeBlog = (object) => {
  return async (dispatch) => {
    await blogService.addLikes(object.id, object)
    dispatch(addLikeBlog(object))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlogRed(id))
  }
}

export const addCommentBlog = (blog, comment) => {
  return async (dispatch) => {
    await blogService.addComment(blog.id, comment)
    dispatch(addComment({ blog, comment }))
  }
}

export const { setBlogs, appendBlog, addLikeBlog, deleteBlogRed, addComment } =
  blogSlice.actions
export default blogSlice.reducer
