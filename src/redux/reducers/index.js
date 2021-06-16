import { combineReducers } from 'redux';
import { userReducer as user } from './userReducer';
import { cartReducer as cart } from './cartReducer';
import { errorReducer as error } from './errorReducer';

const reducer = combineReducers({
  user,
  cart,
  error,
});

export default reducer;
