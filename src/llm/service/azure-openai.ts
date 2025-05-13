import { config } from "@elara/src/config";
import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";

export const azureOpenAI = new AzureChatOpenAI({
  azureOpenAIApiKey: config.azureOpenAiApiKey,
  azureOpenAIApiDeploymentName: config.azureOpenAiDeployment,
  azureOpenAIApiVersion: config.openAiApiVersion,
  azureOpenAIApiInstanceName: config.azureOpenAIInstanceName,
});

export const azureOpenAIEmbedding = new AzureOpenAIEmbeddings({
  azureOpenAIApiKey: config.azureOpenAiApiKey,
  azureOpenAIApiVersion: config.openAiApiVersion,
  azureOpenAIApiEmbeddingsDeploymentName: config.azureOpenAiEmbeddingDeployment,
  azureOpenAIApiInstanceName: config.azureOpenAIInstanceName,
});

export const getAzureOpenAI = ({ temperature }: { temperature: number }) => {
  return new AzureChatOpenAI({
    azureOpenAIApiKey: config.azureOpenAiApiKey,
    azureOpenAIApiDeploymentName: config.azureOpenAiDeployment,
    azureOpenAIApiVersion: config.openAiApiVersion,
    azureOpenAIApiInstanceName: config.azureOpenAIInstanceName,
    temperature,
  });
};
