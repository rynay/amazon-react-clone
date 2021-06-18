import * as TYPES from '../TYPES';

export const pathReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_PATH:
      return action.payload;
    default:
      return state;
  }
};
