import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: null as TCartItem[] | null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<typeof initialState['value']>) => {
      state.value = action.payload
    },
    addToCart: (state, action: PayloadAction<TCartItem>) => {
      const target = state.value.findIndex(
        (item) => item.id === action.payload.id
      )
      if (target !== -1) {
        state.value[target].count += 1
        state.value[target].total += state.value[target].price
      } else {
        state.value.push({
          ...action.payload,
          count: 1,
          total: action.payload.price,
        })
      }
    },
    removeFromCart: (state, action: PayloadAction<TCartItem>) => {
      const target = state.value.findIndex(
        (item) => item.id === action.payload.id
      )
      if (target !== -1 && state[target].count === 1) {
        state.value = state.value.filter(
          (item) => item.id !== action.payload.id
        )
      } else {
        state.value[target].count -= 1
        state.value[target].total -= state.value[target].price
      }
    },
    clearCart: (state) => {
      state.value = []
    },
  },
})

export const { removeFromCart, addToCart, clearCart, setCart } =
  cartSlice.actions
export default cartSlice.reducer
