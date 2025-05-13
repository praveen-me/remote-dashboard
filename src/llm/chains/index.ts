import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  answerUserQueryTemplate,
  standAloneQuestionTemplate,
} from "@elara/src/llm/prompts/agent-prompts";
import { getAzureOpenAI } from "@elara/src/llm/service/azure-openai";
import {
  combineDocuments,
  generateEmbedding,
} from "@elara/src/llm/utils/parse-document";
import { retrieveMatchingDocuments } from "@elara/src/db/utils";

import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { formatConversationHistory } from "@elara/src/llm/utils/fomat-conversation-history";

const processGetMatchingDocuments = async (input: string) => {
  const answerEmbedding = await generateEmbedding(input);

  const matchedDocuments = await retrieveMatchingDocuments(answerEmbedding, 5);

  return matchedDocuments.rows;
};

export type ConvoHistory = {
  agent: string;
  human: string;
};

const convoHistory: ConvoHistory[] = [];

export const invokeStandAloneQuestionChain = async (userQuery: string) => {
  try {
    const standAloneQuestionPrompt = ChatPromptTemplate.fromTemplate(
      standAloneQuestionTemplate
    );

    const standAloneQuestionChain = standAloneQuestionPrompt
      .pipe(getAzureOpenAI({ temperature: 0 }))
      .pipe(new StringOutputParser());

    const retrieverChain = RunnableSequence.from([
      processGetMatchingDocuments,
      combineDocuments,
      new StringOutputParser(),
    ]);

    const answerUserQueryPrompt = ChatPromptTemplate.fromTemplate(
      answerUserQueryTemplate
    );

    const answerUserQueryChain = answerUserQueryPrompt
      .pipe(getAzureOpenAI({ temperature: 0.9 }))
      .pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      standAloneQuestionChain,
      { context: retrieverChain },
      (props) => {
        return {
          question: userQuery,
          history: formatConversationHistory(convoHistory),
          context: props.context,
        };
      },
      answerUserQueryChain,
    ]);

    const response = await chain.invoke({
      question: userQuery,
      history: formatConversationHistory(convoHistory),
    });

    convoHistory.push({
      agent: response,
      human: userQuery,
    });

    console.log(convoHistory);

    return response;
  } catch (e) {
    console.log(e);
  }
};
