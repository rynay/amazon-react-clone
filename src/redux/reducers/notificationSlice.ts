import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  value: [] as TNotification[],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<TNotification>) => {
      state.value.push(action.payload)
    },
    removeNotification: (state, action: PayloadAction<TNotification['id']>) => {
      state.value = state.value.filter(
        (notification) => notification.id !== action.payload
      )
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
