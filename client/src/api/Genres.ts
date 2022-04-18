import { CancelToken } from 'axios';
import { spotifyApiInstance } from './Adapters/xhrAdapters';

const getGenres = (accessToken: string, cancelToken: CancelToken) =>
  spotifyApiInstance(accessToken, cancelToken).get<{ genres: string[] }>('/recommendations/available-genre-seeds');

export { getGenres };
