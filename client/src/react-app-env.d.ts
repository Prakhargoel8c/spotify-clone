/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CLIENT_ID: string;
      REACT_APP_REDIRECT_URI: string;
      REACT_APP_SPOTIFY_LOGIN_URL: string;
      REACT_APP_API_URL: string;
      REACT_APP_SPOTIFY_API_URL: string;
      REACT_APP_TITLE: string;
    }
  }
}
export {};
