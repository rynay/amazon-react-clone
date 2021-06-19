import * as TYPES from '../TYPES';

export const cartReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_CART:
      return action.payload;
    case TYPES.ADD_TO_CART: {
      const target = state.findIndex((item) => item.id === action.payload.id);
      if (target !== -1) {
        return [
          ...state.slice(0, target),
          {
            ...state[target],
            count: state[target].count + 1,
            total: (state[target].count + 1) * state[target].price,
          },
          ...state.slice(target + 1),
        ];
      } else {
        return [
          ...state,
          { ...action.payload, count: 1, total: action.payload.price },
        ];
      }
    }
    case TYPES.REMOVE_FROM_CART: {
      const target = state.findIndex((item) => item.id === action.payload.id);
      if (target !== -1 && state[target].count === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        return [
          ...state.slice(0, target),
          {
            ...state[target],
            count: state[target].count - 1,
            total: state[target].total - state[target].price,
          },
          ...state.slice(target + 1),
        ];
      }
    }
    case TYPES.CLEAR_CART:
      return [];
    default:
      return state;
  }
};
