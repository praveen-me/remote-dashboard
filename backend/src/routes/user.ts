import { db } from "@/src/db";
import express, { Request, Response } from "express";

export const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await db.query.MercorUsers.findMany();

    res.status(200).json({ users });
  } catch (e) {
    console.log(e);
  }
});
