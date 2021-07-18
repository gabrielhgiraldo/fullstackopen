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
      <div>{blog.user ? `added by ${blog.user.name}` : ''}</div>
      <button onClick={() => removeBlog(blog)} style={showRemove}>remove</button>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment =>
          <li key={new Date().getTime()}>{comment}</li>
        )}
      </ul>
    </>
  )
}

export default Blog
