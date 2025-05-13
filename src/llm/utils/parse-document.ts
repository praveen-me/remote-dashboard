import { db } from "@elara/src/db/db";
import { documents } from "@elara/src/db/schema";

import { azureOpenAIEmbedding } from "@elara/src/llm/service/azure-openai";
import { textSplitter } from "@elara/src/llm/utils/text-sanitization";

export const parseDocument = async (path: string) => {
  const content = await textSplitter(path);

  for (let chunk of content) {
    const chunkEmbedding = await azureOpenAIEmbedding.embedQuery(
      chunk.pageContent
    );

    await db.insert(documents).values({
      content: chunk.pageContent,
      embedding: chunkEmbedding,
      metadata: chunk.metadata,
    });
  }
};

export const generateEmbedding = async (text: string) => {
  const embedding = await azureOpenAIEmbedding.embedQuery(text);
  return embedding;
};

export const combineDocuments = (docs: Record<string, any>[]) => {
  return docs.map((doc: any) => doc.content).join("\n\n");
};
