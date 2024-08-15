declare namespace NodeJS {
  interface ProcessEnv {
    REMOTE_HOST: string;
    REMOTE_USER: string;
    REMOTE_PASSWORD: string;
    REMOTE_DB: string;

    LOCAL_DB: string;
    LOCAL_USER: string;
    LOCAL_PASSWORD: string;

    PORT: string;
  }
}
