import { CancelToken } from 'axios';
import { PagedAlbumsList } from '../types/Album';
import { spotifyApiInstance } from './Adapters/xhrAdapters';

const getNewReleases = (accessToken: string, cancelToken: CancelToken, limit: number = 10, offset: number = 0) =>
  spotifyApiInstance(accessToken, cancelToken).get<{ albums: PagedAlbumsList }>('/browse/new-releases', { params: { limit, offset } });

const getFeaturedPlaylists = (accessToken: string, cancelToken: CancelToken, limit: number = 10, offset: number = 0) =>
  spotifyApiInstance(accessToken, cancelToken).get<{ playlists: PagedAlbumsList }>('/browse/featured-playlists', { params: { limit, offset } });

export { getNewReleases, getFeaturedPlaylists };
