import { combineReducers } from 'redux';
import { userReducer as user } from './userReducer';
import { cartReducer as cart } from './cartReducer';
import { errorReducer as error } from './errorReducer';
import { notificationReducer as notifications } from './notificationReducer';

const reducer = combineReducers({
  user,
  cart,
  error,
  notifications,
});

export default reducer;
