import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { requestLogger } from "@/src/utils/logger";
import { userRouter } from "@/src/routes/user";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(requestLogger);

app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
