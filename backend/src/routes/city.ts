import { cityController } from "@/src/controllers/cityController";

import express, { Request, Response } from "express";

export const cityRouter = express.Router();

cityRouter.get("/cities", async (req: Request, res: Response) => {
  try {
    const cities = await cityController.getAllCities();

    return res.status(200).json({ cities });
  } catch (e) {
    console.log(e);
  }
});
