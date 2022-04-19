import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { getFeaturedPlaylists } from '../../../api/Albums';
import { RootState } from '../../../store/store';
import { Album, PagedAlbums } from '../../../types/Album';

export interface featuredState {
  albums: Album[];
  totalPageCount: number;
  status: 'idle' | 'loading' | 'failed';
  pageSize: number;
}

const initialState: featuredState = { albums: [], totalPageCount: 0, status: 'idle', pageSize: 10 };

export const loadAlbumsData = createAsyncThunk<PagedAlbums, { pageNumber: number; cancelToken: CancelToken }, { state: RootState }>(
  'featured/loadAlbums',
  async ({ pageNumber, cancelToken }, { getState }) => {
    const { user, featured } = getState();
    if (!user.userToken) return { items: [], total: 0 };
    const { data } = await getFeaturedPlaylists(user.userToken.accessToken, cancelToken, featured.pageSize, (pageNumber - 1) * featured.pageSize);
    const albums = data.playlists.items.map(({ id, name, images }) => ({ id, title: name, image: images.length > 0 ? images[0].url : '' }));
    return { items: albums, total: data.playlists.total };
  }
);

export const featuredSlice = createSlice({
  name: 'featured',
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

export default featuredSlice.reducer;

export const selectAlbums = (state: RootState) => Object.values(state.featured.albums);
export const selectAlbumPagesTotalCount = (state: RootState) => state.featured.totalPageCount;
export const selectApiStatus = (state: RootState) => state.featured.status;
