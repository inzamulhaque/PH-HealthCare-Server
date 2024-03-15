import { Request, Response } from "express";
import { createAdminIntoDB } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  const result = await createAdminIntoDB(req.body);
  res.send(result);
};

export { createAdmin };
