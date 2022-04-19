import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { getGenres } from '../../../api/Genres';
import { RootState } from '../../../store/store';

export interface GenreState {
  genres: string[];
  status: 'idle' | 'loading' | 'failed';
  selectedGeners: string[];
  totalPageCount: number;
  pageSize: number;
}

const initialState: GenreState = { genres: [], status: 'idle', pageSize: 25, selectedGeners: [], totalPageCount: 0 };

export const loadGenresData = createAsyncThunk<string[], CancelToken, { state: RootState }>('genre/loadGenres', async (cancelToken, { getState }) => {
  const { user } = getState();
  if (!user.userToken) return [];
  const { data } = await getGenres(user.userToken.accessToken, cancelToken);
  return data.genres;
});

export const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setPageGenres: (state, { payload }: PayloadAction<number>) => {
      state.selectedGeners = state.genres.slice((payload - 1) * state.pageSize, payload * state.pageSize);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadGenresData.fulfilled, (state, { payload }) => {
        state.genres = payload;
        state.selectedGeners = payload.slice(0, state.pageSize);
        state.status = 'idle';
        state.totalPageCount = Math.ceil(payload.length / state.pageSize);
      })
      .addCase(loadGenresData.pending, (state) => {
        state.status = 'loading';
      });
  },
});
export const { setPageGenres } = genreSlice.actions;
export default genreSlice.reducer;

export const selectGenres = (state: RootState) => Object.values(state.genre.selectedGeners);
export const selectApiStatus = (state: RootState) => state.genre.status;
export const selectGenresPageCount = (state: RootState) => state.genre.totalPageCount;
