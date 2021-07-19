import React from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <Form onSubmit={handleSubmit} id='login-form'>
      <Form.Group>
        <Form.Label> username</Form.Label>
        <Form.Control
          id='username'
          name='username'
          type='text'
          value={username}
          onChange={handleUsernameChange}
        />
        <Form.Label>password</Form.Label>
        <Form.Control
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
        <Button id='login' type='submit'>login</Button>
      </Form.Group>
    </Form>

  )
}

export default LoginForm