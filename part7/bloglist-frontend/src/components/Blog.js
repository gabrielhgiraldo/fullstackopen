import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

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
        <Button onClick={() => likeBlog(blog)}>like</Button>
      </div>
      <div>{blog.user ? `added by ${blog.user.name}` : ''}</div>
      <Button onClick={() => removeBlog(blog)} style={showRemove}>remove</Button>
      <h3>comments</h3>
      <input type="text" id="comment"></input>
      <Button onClick={createComment}>add comment</Button>
      <ListGroup>
        {blog.comments.map(comment =>
          <ListGroup.Item key={new Date().getTime()}>{comment}</ListGroup.Item>
        )}
      </ListGroup>
    </>
  )
}

export default Blog
