import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './globalReducers/userSlice';
import homePageReducer from '../containers/HomePage/state';
import weeklyReducer from '../containers/Weekly/state';
import featuredReducer from '../containers/Featured/state';
import genreReducer from '../containers/Genres/state';

export const store = configureStore({
  reducer: {
    user: userReducer,
    homePage: homePageReducer,
    weekly: weeklyReducer,
    featured: featuredReducer,
    genre: genreReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
