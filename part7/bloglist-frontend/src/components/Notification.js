import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if (notification) {
    return (
      <Alert variant={notification.type}>{notification.message}</Alert>
    )
  }

  return ''
}

export default Notification