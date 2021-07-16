import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(
  notificationReducer,
  applyMiddleware(thunk)
)

export default store