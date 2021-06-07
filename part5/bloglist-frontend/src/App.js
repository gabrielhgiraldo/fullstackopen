import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch {
      setNotification({ type: 'error', message: 'wrong username or password'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  const createBlog = async (event) => {
    event.preventDefault()
    const newBlog = await blogService.createBlog(title, author, url, user.token)
    setBlogs(blogs.concat(newBlog))
    setNotification({ type: 'success', message: `a new blog ${title} by ${author} added` })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
      <Togglable buttonLabel='create new blog'>
        <CreateBlogForm
          handleSubmit={createBlog}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App