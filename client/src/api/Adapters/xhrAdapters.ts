import axios, { CancelToken } from 'axios';

const apiInstance = (cancelToken: CancelToken) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    cancelToken,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

const spotifyApiInstance = (accessToken: string, cancelToken: CancelToken) =>
  axios.create({
    baseURL: process.env.REACT_APP_SPOTIFY_API_URL,
    cancelToken,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

export { apiInstance, spotifyApiInstance };
