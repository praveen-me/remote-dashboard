import { countryController } from "@/src/controllers/countryController";

import express, { Request, Response } from "express";

export const countryRouter = express.Router();

countryRouter.get("/countries", async (req: Request, res: Response) => {
  try {
    const countries = await countryController.getAllCountries();

    return res.status(200).json({ countries });
  } catch (e) {
    console.log(e);
  }
});
