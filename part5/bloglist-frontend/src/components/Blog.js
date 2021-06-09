import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, allowRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const buttonLabel = visible ? 'hide' : 'view'
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)

  const showRemove = { display: allowRemove ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='details'>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <button onClick={() => removeBlog(blog)} style={showRemove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  allowRemove: PropTypes.bool.isRequired
}

export default Blog