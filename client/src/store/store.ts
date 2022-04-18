import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './globalReducers/userSlice';
import homePageReducer from '../containers/HomePage/state';
export const store = configureStore({
  reducer: {
    user: userReducer,
    homePage: homePageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
