import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { requestLogger } from "@/src/utils/logger";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express Server!!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
