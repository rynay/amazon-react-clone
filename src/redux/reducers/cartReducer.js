import * as TYPES from '../TYPES';

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      const target = state.findIndex((item) => item.id === action.payload.id);
      if (target) {
        return [
          ...state.slice(0, target),
          {
            ...state[target],
            count: state[target].count + 1,
            total: (state[target].count + 1) * state[target].price,
          },
          ...state.slice(target),
        ];
      } else {
        return [
          ...state,
          { ...action.payload, count: 1, total: action.payload.price },
        ];
      }
    }
    case TYPES.REMOVE_FROM_CART: {
      const target = state.findIndex((item) => item.id === action.payload);
      if (target && state[target].count === 1) {
        return state.filter((item) => item.id !== action.payload.id);
      } else {
        return [
          ...state.slice(0, target),
          {
            ...state[target],
            count: state[target].count - 1,
            total: state[target].count - state[target].price,
          },
          ...state.slice(target),
        ];
      }
    }
    case TYPES.CLEAR_CART:
      return [];
    default:
      return state;
  }
};
