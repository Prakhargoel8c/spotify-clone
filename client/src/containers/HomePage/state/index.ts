import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CancelToken } from 'axios';
import { getFeaturedPlaylists, getNewReleases } from '../../../api/Albums';
import { getGenres } from '../../../api/Genres';
import { RootState } from '../../../store/store';
import { Album } from '../../../types/Album';

export interface HomePageState {
  albums: Album[];
  featuredPlayLists: Album[];
  genres: string[];
}

const initialState: HomePageState = { albums: [], featuredPlayLists: [], genres: [] };

export const loadAlbumsData = createAsyncThunk<Album[], CancelToken, { state: RootState }>(
  'homepage/loadAlbums',
  async (canelToken, { getState }) => {
    const { user } = getState();
    if (!user.userToken) return [];
    const { data } = await getNewReleases(user.userToken.accessToken, canelToken);
    const albums: Album[] = data.albums.items.map(({ id, name, images }) => ({ id, title: name, image: images.length > 1 ? images[1].url : '' }));
    return albums;
  }
);

export const loadFeaturedPlaylistsData = createAsyncThunk<Album[], CancelToken, { state: RootState }>(
  'homepage/loadFeaturedPlaylists',
  async (canelToken, { getState }) => {
    const { user } = getState();
    if (!user.userToken) return [];
    const { data } = await getFeaturedPlaylists(user.userToken.accessToken, canelToken);
    const albums: Album[] = data.playlists.items.map(({ id, name, images }) => ({ id, title: name, image: images.length > 0 ? images[0].url : '' }));
    return albums;
  }
);

export const loadGenresData = createAsyncThunk<string[], CancelToken, { state: RootState }>(
  'homepage/loadGenres',
  async (canelToken, { getState }) => {
    const { user } = getState();
    if (!user.userToken) return [];
    const { data } = await getGenres(user.userToken.accessToken, canelToken);
    return data.genres;
  }
);
export const homePageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAlbumsData.fulfilled, (state, { payload }) => {
        state.albums = payload;
      })
      .addCase(loadFeaturedPlaylistsData.fulfilled, (state, { payload }) => {
        state.featuredPlayLists = payload;
      })
      .addCase(loadGenresData.fulfilled, (state, { payload }) => {
        state.genres = payload;
      });
  },
});

export default homePageSlice.reducer;

export const selectAlbums = (state: RootState) => state.homePage.albums;
export const selectFeaturedPlaylists = (state: RootState) => state.homePage.featuredPlayLists;
export const selectGenres = (state: RootState) => state.homePage.genres;
