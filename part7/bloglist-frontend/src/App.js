import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogItem from './components/BlogItem'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import User from './components/User'
import Menu from './components/Menu'
import { Switch, Route, useRouteMatch, Link, useHistory } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { setUser, login } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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
      history.push('/')
    }
  }

  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch ?
    users.find(user => user.id === userMatch.params.id)
    : null
  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch ?
    blogs.find(blog => blog.id === blogMatch.params.id)
    : null
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
      <Menu user={user} handleLogout={handleLogout}></Menu>
      <h2>blog app</h2>
      <Switch>
        <Route path='/users/:id'>
          <User user={matchedUser}></User>
        </Route>
        <Route path='/users'>
          <h2>Users</h2>
          <table>
            <tbody>
              <tr><th></th><th>blogs created</th></tr>
              {users.map(user =>
                <tr key={user.name}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </Route>
        <Route path='/blogs/:id'>
          <Blog
            blog={matchedBlog}
            likeBlog={() => dispatch(likeBlog(matchedBlog))}
            removeBlog={removeBlog}
            allowRemove={matchedBlog && matchedBlog.user ? user.username === matchedBlog.user.username : false}
          >
          </Blog>
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <BlogItem
              key={blog.id}
              blog={blog}
            />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App