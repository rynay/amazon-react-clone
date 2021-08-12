import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// const localUser: object | null = JSON.parse(localStorage.getItem('user'));

const initialState = {
  value: null as TUser | null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<typeof initialState['value']>) => {
      state.value = action.payload
    },
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
