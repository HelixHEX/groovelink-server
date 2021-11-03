declare namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL: string;
      PORT: number;
      GET_STREAM_KEY: string;
      GET_STREAM_SECRET: string;
    }
  }