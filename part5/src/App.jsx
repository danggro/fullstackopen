import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useRef } from 'react'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [notifClass, setNotifClass] = useState(true)

  const blogFormRef = useRef()

  useEffect(() => {
    const getAllBlog = async () => {
      const allBlog = await blogService.getAll()
      setBlogs(allBlog)
    }
    getAllBlog()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      setUser(user)
    } catch (error) {
      handleNotification(`wrong username or password`, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddBlog = async (newObject) => {
    try {
      const newBlog = await blogService.create(newObject)
      const allBlog = await blogService.getAll()
      setBlogs(allBlog)

      handleNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        false
      )

      blogFormRef.current.toggleVisibility()
    } catch (error) {
      handleNotification(error.message, true)
    }
  }

  const handleAddLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const editedBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.addLikes(id, editedBlog)
    setBlogs(blogs.map((b) => (b.id !== editedBlog.id ? b : editedBlog)))
  }

  const handleDeleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
    }
  }

  const handleNotification = (message, error) => {
    setNotification(message)
    setNotifClass(error)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const loginForm = () => <LoginForm login={handleLogin} />

  const blogForm = () => (
    <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
      <BlogForm addBlog={handleAddBlog} />
    </Togglable>
  )

  const blogsView = () => (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            addLikes={handleAddLikes}
            deleteBlog={handleDeleteBlog}
          />
        ))}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} error={notifClass} />
      {!user ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </p>

          {blogForm()}
          {blogsView()}
        </div>
      )}
    </div>
  )
}

export default App
