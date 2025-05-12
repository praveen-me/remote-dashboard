import { textSplitter } from "@elara/src/llm/utils/text-sanitization";

export const parseDocument = async (path: string) => {
  const content = await textSplitter(path);
};
