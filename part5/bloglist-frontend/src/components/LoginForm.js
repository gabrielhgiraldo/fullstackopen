import React from 'react'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
            username
        <input
          name='username'
          type='text'
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
            password
        <input
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