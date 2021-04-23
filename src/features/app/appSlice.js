import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    counter: {
      counter1: 0,
      counter2: 0,
      counter3: 0,
    }
  },
  reducers: {
    incrementOne: (state) => {
      state.counter.counter1 += 1;
    },
    incrementTwo: (state) => {
      state.counter.counter2 += 1;
    },
    incrementThree: (state) => {
      state.counter.counter3 += 1;
    },
  }
});

export const { incrementOne, incrementTwo, incrementThree } = appSlice.actions;

export default appSlice.reducer;