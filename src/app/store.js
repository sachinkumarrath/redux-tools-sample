import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import authReducer from '../features/auth/authSlice';
import pullRefreshReducer from '../features/pull-refresh/pullRefreshSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    pullRefresh: pullRefreshReducer,
  },
});
