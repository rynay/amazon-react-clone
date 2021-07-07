import * as TYPES from '../TYPES';

const localUser: object | null = JSON.parse(localStorage.getItem('user'));

export const userReducer = (
  state = localUser,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case TYPES.SET_USER:
      return action.payload;
    default:
      return state;
  }
};
