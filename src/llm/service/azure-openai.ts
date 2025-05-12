import { config } from "@elara/src/config";
import { AzureOpenAI } from "@langchain/openai";

const azureOpenAI = new AzureOpenAI({
  azureOpenAIApiKey: config.azureOpenAiApiKey,
  azureOpenAIEndpoint: config.azureOpenAiEndpoint,
  deploymentName: config.azureOpenAiDeployment,
  azureOpenAIApiEmbeddingsDeploymentName: config.azureOpenAiEmbeddingDeployment,
  azureOpenAIApiVersion: config.openAiApiVersion,
});
