import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, login } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem('user')
    if (userString) {
      dispatch(setUser(JSON.parse(userString)))
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login(username, password))
      setUsername('')
      setPassword('')
    }
    catch (error){
      dispatch(setNotification({ type: 'error', message: 'wrong username or password' }))
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('user')
  }

  const addBlog = async (newBlog) => {
    dispatch(createBlog(newBlog, user.token))
    dispatch(setNotification({ type: 'success', message: `a new blog ${newBlog.title} by ${newBlog.author} added` }))
    blogFormRef.current.toggleVisibility()
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog, user.token))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification}/>
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification}/>
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => dispatch(likeBlog(blog))}
          removeBlog={removeBlog}
          allowRemove={blog.user ? user.username === blog.user.username : false}
        />
      )}
    </div>
  )
}

export default App