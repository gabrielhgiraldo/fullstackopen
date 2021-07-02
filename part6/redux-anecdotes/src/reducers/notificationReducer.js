const notificationReducer = (state, action) => {
    if (action.type === 'MESSAGE'){
      return action.data
    }
    return ''
}

export const notifyMessage = (message) => {
  return {
    type: 'MESSAGE',
    data: message
  }
}

export const removeNotification = () => {
  return {
    type: 'MESSAGE',
    data: ''
  }
}

export default notificationReducer