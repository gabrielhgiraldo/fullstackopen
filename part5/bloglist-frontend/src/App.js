import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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
        <form onSubmit={handleLogin}>
          <div>
            username
            <input 
              name='username' 
              type='text'
              value={username}
              onChange={({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input 
              name='password' 
              type='password'
              value={password}
              onChange={({target}) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
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
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
          author:
          <input
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url:
          <input
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App