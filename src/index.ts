import express from "express";
import dotenv from "dotenv";
import { invokeStandAloneQuestionChain } from "@elara/src/llm/chains";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript Node.js Server! 🎉");
});

app.post("/chat", async (req, res) => {
  const { question } = req.body;
  const response = await invokeStandAloneQuestionChain(question as string);
  res.json(response);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
