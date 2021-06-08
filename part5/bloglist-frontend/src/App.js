import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const userString = window.localStorage.getItem('user')
    if (userString) {
      setUser(JSON.parse(userString))
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch (error){
      setNotification({ type: 'error', message: 'wrong username or password' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const createBlog = async (newBlog) => {
    const createdBlog = await blogService.createBlog(newBlog, user.token)
    setBlogs(blogs.concat(createdBlog))
    setNotification({ type: 'success', message: `a new blog ${createdBlog.title} by ${createdBlog.author} added` })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog = async (blog) => {
    const blogUpdate = {
      author: blog.author,
      title: blog.title,
      url: blog.url,
      user: blog.user ? blog.user.id : undefined,
      likes: blog.likes + 1
    }
    const updatedBlog = await blogService.updateBlog(blog.id, blogUpdate)
    const blogIndex = blogs.findIndex(currentBlog => currentBlog.id === blog.id)
    setBlogs([
      ...blogs.slice(0, blogIndex),
      updatedBlog,
      ...blogs.slice(blogIndex + 1)
    ])
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id, user.token)
      const blogIndex = blogs.findIndex(currentBlog => currentBlog.id === blog.id)
      setBlogs([
        ...blogs.slice(0, blogIndex),
        ...blogs.slice(blogIndex + 1)
      ])
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
      <p>{
        user.name} logged in
      <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={createBlog}
        />
      </Togglable>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
          allowRemove={blog.user ? user.username === blog.user.username : false}
        />
      )}
    </div>
  )
}

export default App