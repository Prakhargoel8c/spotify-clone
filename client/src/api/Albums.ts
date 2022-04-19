import { CancelToken } from 'axios';
import { PagedAlbumsResponse } from '../types/Album';
import { spotifyApiInstance } from './Adapters/xhrAdapters';

const getNewReleases = (accessToken: string, cancelToken: CancelToken, limit: number = 10, offset: number = 0) =>
  spotifyApiInstance(accessToken, cancelToken).get<{ albums: PagedAlbumsResponse }>('/browse/new-releases', { params: { limit, offset } });

const getFeaturedPlaylists = (accessToken: string, cancelToken: CancelToken, limit: number = 10, offset: number = 0) =>
  spotifyApiInstance(accessToken, cancelToken).get<{ playlists: PagedAlbumsResponse }>('/browse/featured-playlists', { params: { limit, offset } });

export { getNewReleases, getFeaturedPlaylists };
