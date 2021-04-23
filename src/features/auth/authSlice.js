import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: '',
    email: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  }
});

export const { setUserName, setEmail } = authSlice.actions;

export default authSlice.reducer;