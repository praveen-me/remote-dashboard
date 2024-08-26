import "module-alias/register";
import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import { requestLogger } from "@/src/utils/logger";
import { userRouter } from "@/src/routes/user";
import { skillsRouter } from "@/src/routes/skills";

import { cityRouter } from "@/src/routes/city";
import { countryRouter } from "@/src/routes/countries";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", skillsRouter);
app.use("/api", cityRouter);
app.use("/api", countryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
