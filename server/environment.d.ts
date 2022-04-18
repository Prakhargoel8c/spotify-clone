declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      CLIENT_SECRET: string;
      CLIENT_ID: string;
      REDIRECT_URI: string;
    }
  }
}
export {};
