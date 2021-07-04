const notificationReducer = (state='', action) => {
    if(action.type === 'MESSAGE'){
        return action.data
    }
    return state
}

let timeoutId = null
export const setNotification = (message, seconds) => {
  return async dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch({
      type: 'MESSAGE',
      data: message
    })
    timeoutId = setTimeout(() => dispatch({
      type: 'MESSAGE',
      data: ''
    }), seconds * 1000)
  }
}

export default notificationReducer