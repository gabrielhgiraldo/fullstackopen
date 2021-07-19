import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await createBlog({ url, author, title })
    setUrl('')
    setAuthor('')
    setTitle('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='title'
            type='text'
            name='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='author'
            type='text'
            name='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            type='text'
            name='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id='create-blog' type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateBlogForm