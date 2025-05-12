import express from "express";
import dotenv from "dotenv";
import { parseDocument } from "@elara/src/llm/utils/parse-document";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript Node.js Server! 🎉");
});

// parseDocument("knowledge/elara.txt");

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
