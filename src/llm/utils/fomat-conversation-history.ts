import { ConvoHistory } from "@elara/src/llm/chains";

export const formatConversationHistory = (history: ConvoHistory[]) => {
  return history
    .map((message) => {
      return `
      Agent: ${message.agent}
      Human: ${message.human}
    `;
    })
    .join("\n");
};
