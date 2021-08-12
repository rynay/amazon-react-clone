import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: null as TError | null,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<typeof initialState['value']>) => {
      state.value = action.payload
    },
  },
})

export const { setError } = errorSlice.actions
export default errorSlice.reducer
