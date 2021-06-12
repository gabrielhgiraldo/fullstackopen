import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleSubmit} id='login-form'>
      <div>
            username
        <input
          id='username'
          name='username'
          type='text'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
            password
        <input
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button type='submit'>login</button>
    </form>

  )
}

export default LoginForm