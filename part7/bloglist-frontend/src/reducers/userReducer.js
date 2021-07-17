import loginService from '../services/login'


const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.data
    default:
      return state
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch({
      type: 'SET_USER',
      data: user
    })
    window.localStorage.setItem('user', JSON.stringify(user))
  }

}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export default userReducer