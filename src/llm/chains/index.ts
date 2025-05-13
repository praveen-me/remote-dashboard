import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  answerUserQueryTemplate,
  standAloneQuestionTemplate,
} from "@elara/src/llm/prompts/agent-prompts";
import {
  azureOpenAI,
  getAzureOpenAI,
} from "@elara/src/llm/service/azure-openai";
import {
  combineDocuments,
  generateEmbedding,
} from "@elara/src/llm/utils/parse-document";
import { retrieveMatchingDocuments } from "@elara/src/db/utils";

import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const processGetMatchingDocuments = async (input: string) => {
  const answerEmbedding = await generateEmbedding(input);

  const matchedDocuments = await retrieveMatchingDocuments(answerEmbedding, 3);

  return matchedDocuments.rows;
};

export const invokeStandAloneQuestionChain = async (userQuery: string) => {
  try {
    const standAloneQuestionPrompt = ChatPromptTemplate.fromTemplate(
      standAloneQuestionTemplate
    );

    const standAloneQuestionChain = standAloneQuestionPrompt
      .pipe(getAzureOpenAI({ temperature: 0.4 }))
      .pipe(new StringOutputParser())
      .pipe(processGetMatchingDocuments)
      .pipe(combineDocuments)
      .pipe(new StringOutputParser());

    const answerUserQueryPrompt = ChatPromptTemplate.fromTemplate(
      answerUserQueryTemplate
    );

    const answerUserQueryChain = answerUserQueryPrompt
      .pipe(getAzureOpenAI({ temperature: 0.9 }))
      .pipe(new StringOutputParser());

    const chain = RunnableSequence.from([
      {
        context: standAloneQuestionChain,
        props: new RunnablePassthrough<{
          question: string;
        }>(),
      },
      ({ props: { question }, context }) => ({
        context: context,
        question: question,
      }),
      answerUserQueryChain,
    ]);

    const response = await chain.invoke({
      question: userQuery,
    });

    return response;
  } catch (e) {
    console.log(e);
  }
};
