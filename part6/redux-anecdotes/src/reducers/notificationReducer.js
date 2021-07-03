const notificationReducer = (state='', action) => {
    if(action.type === 'MESSAGE'){
        return action.data
    }
    return state
}

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'MESSAGE',
      data: message
    })
    setTimeout(() => dispatch({
      type: 'MESSAGE',
      data: ''
    }), seconds * 1000)
  }
}

export default notificationReducer