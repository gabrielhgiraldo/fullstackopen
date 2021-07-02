const notificationReducer = (state, action) => {
  if (action === 'MESSAGE'){
    return action.data
  }
  return 'This is a notification message'
}

export const notifyMessage = (message) => {
  return {
    type: 'MESSAGE',
    data: message
  }
}

export default notificationReducer