import { userController } from "@/src/controllers/userController";
import express, { Request, Response } from "express";

export const userRouter = express.Router();

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

userRouter.get(
  "/users",
  async (req: Request<UserParams, {}, {}, PaginationQuery>, res: Response) => {
    const { offset, limit } = req.query;

    console.log({ limit, offset });

    try {
      const users = await userController.getUsers({
        limit: limit,
        offset: offset,
      });

      res.status(200).json({ users });
    } catch (e) {
      console.log(e);
    }
  }
);

userRouter.get(
  "/users/:id/basic",
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;

    try {
      const user = await userController.getUserDetailById(userId);
      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
    }
  }
);

userRouter.get(
  "/users/:id/availability",
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;

    try {
      const user = await userController.getUserDetailById(userId);
      res.status(200).json({ user });
    } catch (e) {
      console.log(e);
    }
  }
);

userRouter.get(
  "/users/:id/education",
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;

    try {
      const educations = await userController.getUserEducationById(userId);
      res.status(200).json({ educations });
    } catch (e) {
      console.log(e);
    }
  }
);

userRouter.get(
  "/users/:id/experience",
  async (req: Request<{ id: string }>, res: Response) => {
    const userId = req.params.id;

    try {
      const workExperiences = await userController.getUserWorkExperienceById(
        userId
      );
      res.status(200).json({ workExperiences });
    } catch (e) {
      console.log(e);
    }
  }
);

userRouter.get(
  "/search",
  async (
    req: Request<{}, {}, SearchRequestBody, PaginationQuery & SearchQuery>,
    res: Response
  ) => {
    const { limit, offset, type } = req.query;

    const { value } = req.body;

    console.log({ value, type });

    try {
      const users = await userController.searchUsers({
        limit: limit || 8,
        offset: offset || 0,
        type,
        value,
      });

      return res.status(200).json({ users });
    } catch (e) {
      console.log(e);
    }
  }
);
