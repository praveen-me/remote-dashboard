import express from "express";
import dotenv from "dotenv";
import { parseDocument } from "@elara/src/llm/utils/parse-document";
import { invokeStandAloneQuestionChain } from "@elara/src/llm/chains";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript Node.js Server! 🎉");
});

invokeStandAloneQuestionChain(
  "hello, My name is praveen, how are you? Where can I find the best books about AI?"
).then((res) => console.log(res));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
