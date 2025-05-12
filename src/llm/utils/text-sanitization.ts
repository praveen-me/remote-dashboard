import fs, { readFileSync } from "fs";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const textSplitter = async (path: string) => {
  try {
    const result = readFileSync(path, "utf-8");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
      separators: ["\n\n---\n\n", "\n\n"],
    });
    const output = await splitter.createDocuments([result]);

    return output;
  } catch (error) {
    console.log(error);
    return [];
  }
};
