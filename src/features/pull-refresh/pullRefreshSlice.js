import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const mockAsync = (timeout) => {
  setTimeout(() => Promise.resolve(), timeout);
};

export const fetchMockData = createAsyncThunk(
  'pullRefresh/fetchMockData',
  async (payload) => {
    const { timeout, componentId } = payload;
    await mockAsync(timeout)
    return componentId
  }
);

export const pullRefreshSlice = createSlice({
  name: 'pullRefresh',
  initialState: {
    componentList: [],
    isPullRefresh: false,
  },
  reducers: {
    setIsPullRefresh: (state, action) => {
      state.isPullRefresh = action.payload;
    },
    addComponentList: (state, action) => {
      state.componentList = [...state.componentList, ...action.payload];
    },
    removeFromComponentList: (state, action) => {
      state.componentList = state.componentList.filter(component => component !== action.payload);
    },
  },
  extraReducers: {
    [fetchMockData.fulfilled]: (state, action) => {
      // console.log('fulfilled', action);
      state.componentList = state.componentList.filter(component => component !== action.payload);
    }
  }
});

export const { setIsPullRefresh, addComponentList, removeFromComponentList } = pullRefreshSlice.actions;

export default pullRefreshSlice.reducer;