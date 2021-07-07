import * as TYPES from '../TYPES';

export const errorReducer = (
  state = null,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case TYPES.SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};
