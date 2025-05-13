declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT?: string;
    AZURE_OPENAI_ENDPOINT: string;
    AZURE_OPENAI_API_KEY: string;
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT: string;
    AZURE_OPENAI_DEPLOYMENT: string;
    OPENAI_API_VERSION: string;
    DATABASE_URL: string;
    AZURE_OPENAI_API_INSTANCE_NAME: string;
  }
}
