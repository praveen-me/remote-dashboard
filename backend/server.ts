import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { requestLogger } from "@/src/utils/logger";
import { userRouter } from "@/src/routes/user";
import bodyParser from "body-parser";
import { skillsRouter } from "@/src/routes/skills";
import { countryController } from "@/src/controllers/countryController";
import { cityController } from "@/src/controllers/cityController";
import { cityRouter } from "@/src/routes/city";
import { countryRouter } from "@/src/routes/countries";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", userRouter);
app.use("/api", skillsRouter);
app.use("/api/", cityRouter);
app.use("/api/", countryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
