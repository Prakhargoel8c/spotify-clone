import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { getNewReleases } from '../../../api/Albums';
import { RootState } from '../../../store/store';
import { Album, PagedAlbums } from '../../../types/Album';

export interface weeklyState {
  albums: Album[];
  totalPageCount: number;
  status: 'idle' | 'loading' | 'failed';
  pageSize: number;
}

const initialState: weeklyState = { albums: [], totalPageCount: 0, status: 'idle', pageSize: 10 };

export const loadAlbumsData = createAsyncThunk<PagedAlbums, { pageNumber: number; cancelToken: CancelToken }, { state: RootState }>(
  'weekly/loadAlbums',
  async ({ pageNumber, cancelToken }, { getState }) => {
    const { user, weekly } = getState();
    if (!user.userToken) return { items: [], total: 0 };
    const { data } = await getNewReleases(user.userToken.accessToken, cancelToken, weekly.pageSize, (pageNumber - 1) * weekly.pageSize);
    const albums = data.albums.items.map(({ id, name, images }) => ({ id, title: name, image: images.length > 0 ? images[0].url : '' }));
    return { items: albums, total: data.albums.total };
  }
);

export const weeklySlice = createSlice({
  name: 'weekly',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAlbumsData.fulfilled, (state, { payload }) => {
        state.albums = { ...state.albums, ...payload.items };
        state.status = 'idle';
        state.totalPageCount = Math.ceil(payload.total / state.pageSize);
      })
      .addCase(loadAlbumsData.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export default weeklySlice.reducer;

export const selectAlbums = (state: RootState) => Object.values(state.weekly.albums);
export const selectAlbumsTotalCount = (state: RootState) => state.weekly.totalPageCount;
export const selectApiStatus = (state: RootState) => state.weekly.status;
