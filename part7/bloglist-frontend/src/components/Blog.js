import React from 'react'

const Blog = ({ blog, allowRemove, likeBlog, removeBlog }) => {
  const showRemove = { display: allowRemove ? '' : 'none' }
  if (!blog) {
    return null
  }

  return (
    <>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={() => likeBlog(blog)}>like</button>
      </div>
      <div>{blog.user ? blog.user.name : ''}</div>
      <button onClick={() => removeBlog(blog)} style={showRemove}>remove</button>
    </>
  )
}

export default Blog
