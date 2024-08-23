import { skillsController } from "@/src/controllers/skillsController";
import express, { Request, Response } from "express";

export const skillsRouter = express.Router();

interface UserParams {
  userId: string;
}

interface PaginationQuery {
  limit?: number;
  offset?: number;
}

export interface SearchQuery {
  type: "skills" | "city" | "name" | "country";
}

interface SearchRequestBody {
  value: string;
}

skillsRouter.get(
  "/skills",
  async (
    req: Request<{}, {}, SearchRequestBody, PaginationQuery & SearchQuery>,
    res: Response
  ) => {
    try {
      const skills = await skillsController.getAllSkills();

      return res.status(200).json({ skills });
    } catch (e) {
      console.log(e);
    }
  }
);
