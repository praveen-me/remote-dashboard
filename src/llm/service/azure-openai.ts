import { config } from "@elara/src/config";
import { AzureOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";

export const azureOpenAI = new AzureOpenAI({
  azureOpenAIApiKey: config.azureOpenAiApiKey,
  azureOpenAIEndpoint: config.azureOpenAiEndpoint,
  deploymentName: config.azureOpenAiDeployment,
  azureOpenAIApiVersion: config.openAiApiVersion,
});

export const azureOpenAIEmbedding = new AzureOpenAIEmbeddings({
  azureOpenAIApiKey: config.azureOpenAiApiKey,
  azureOpenAIApiVersion: config.openAiApiVersion,
  azureOpenAIApiEmbeddingsDeploymentName: config.azureOpenAiEmbeddingDeployment,
  azureOpenAIApiInstanceName: "zaidoc-openai-us-east2",
});
