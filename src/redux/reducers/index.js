import { combineReducers } from 'redux';
import { userReducer as user } from './userReducer';
import { cartReducer as cart } from './cartReducer';
import { errorReducer as error } from './errorReducer';
import { notificationReducer as notifications } from './notificationReducer';
import { pathReducer as path } from './pathReducer';

const reducer = combineReducers({
  user,
  cart,
  error,
  notifications,
  path,
});

export default reducer;
