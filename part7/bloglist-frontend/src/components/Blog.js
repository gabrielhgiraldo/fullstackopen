import React from 'react'

const Blog = ({ blog, allowRemove, likeBlog, removeBlog, addComment }) => {
  const showRemove = { display: allowRemove ? '' : 'none' }
  if (!blog) {
    return null
  }

  const createComment = () => {
    const comment = document.getElementById('comment').value
    addComment(blog.id, comment)
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
      <input type="text" id="comment"></input>
      <button onClick={createComment}>add comment</button>
      <ul>
        {blog.comments.map(comment =>
          <li key={new Date().getTime()}>{comment}</li>
        )}
      </ul>
    </>
  )
}

export default Blog
