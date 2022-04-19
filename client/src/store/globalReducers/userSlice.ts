import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { login, refreshToken } from '../../api/User';
import { UserToken } from '../../types/User';
import { RootState } from '../store';

const userTokenKey = 'userToken';

export interface UserState {
  isAuthenticated: Boolean;
  authenticationStatus: 'idle' | 'loading' | 'failed';
  userToken?: UserToken;
}

const initialState: UserState = {
  isAuthenticated: sessionStorage.getItem(userTokenKey) ? true : false,
  authenticationStatus: 'idle',
  userToken: sessionStorage.userToken ? JSON.parse(sessionStorage.userToken) : undefined,
};

export const loginAsync = createAsyncThunk<UserToken, { code: string; cancelToken: CancelToken }>('user/LOGIN', async ({ code, cancelToken }) => {
  const response = await login(code, cancelToken);
  sessionStorage.setItem(userTokenKey, JSON.stringify(response.data));
  return response.data;
});

export const refreshTokenAsync = createAsyncThunk<UserToken, { token: string; cancelToken: CancelToken }>(
  'user/REFRSH_TOKEN',
  async ({ token, cancelToken }) => {
    const response = await refreshToken(token, cancelToken);
    sessionStorage.setItem(userTokenKey, JSON.stringify(response.data));
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.authenticationStatus = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.isAuthenticated = true;
        state.authenticationStatus = 'idle';
      })
      .addCase(loginAsync.rejected, (state) => {
        state.authenticationStatus = 'failed';
        state.isAuthenticated = false;
        state.userToken = undefined;
      })
      .addCase(refreshTokenAsync.pending, (state) => {
        state.authenticationStatus = 'loading';
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.userToken = action.payload;
        state.isAuthenticated = true;
        state.authenticationStatus = 'idle';
      })
      .addCase(refreshTokenAsync.rejected, (state) => {
        state.authenticationStatus = 'failed';
        state.isAuthenticated = false;
        state.userToken = undefined;
      });
  },
});

export const selectUserToken = (state: RootState) => state.user.userToken;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectAuthenticationStatus = (state: RootState) => state.user.authenticationStatus;

export default userSlice.reducer;
