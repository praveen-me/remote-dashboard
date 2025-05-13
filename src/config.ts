import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT,
  azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
  azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAiEmbeddingDeployment: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
  azureOpenAiDeployment: process.env.AZURE_OPENAI_DEPLOYMENT,
  openAiApiVersion: process.env.OPENAI_API_VERSION,
  databaseUrl: process.env.DATABASE_URL,
  azureOpenAIInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
};
