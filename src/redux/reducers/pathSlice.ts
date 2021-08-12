import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: null as TPath | null,
}

const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<typeof initialState['value']>) => {
      state.value = action.payload
    },
  },
})

export const { setPath } = pathSlice.actions
export default pathSlice.reducer
