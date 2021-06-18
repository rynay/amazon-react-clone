import * as TYPES from '../TYPES';

const localUser = JSON.parse(localStorage.getItem('user')) || null;

export const userReducer = (state = localUser, action) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
