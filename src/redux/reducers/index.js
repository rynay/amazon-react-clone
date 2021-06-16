import { combineReducers } from 'redux';
import { userReducer as user } from './userReducer';
import { cartReducer as cart } from './cartReducer';

const reducer = combineReducers({
  user,
  cart,
});

export default reducer;
