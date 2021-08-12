import { combineReducers } from 'redux'
import user from './userSlice'
import cart from './cartSlice'
import error from './errorSlice'
import notifications from './notificationSlice'
import path from './pathSlice'

const reducer = combineReducers({
  user,
  cart,
  error,
  notifications,
  path,
})

export default reducer
