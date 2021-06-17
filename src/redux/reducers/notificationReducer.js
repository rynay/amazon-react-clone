import * as TYPES from '../TYPES';

export const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_NOTIFICATION:
      return [...state, action.payload];
    case TYPES.REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
};
