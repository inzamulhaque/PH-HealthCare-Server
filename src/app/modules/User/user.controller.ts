import { Request, Response } from "express";
import { createAdminIntoDB } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await createAdminIntoDB(req);

    res.status(200).json({
      success: true,
      message: "Admin Created Successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};

export { createAdmin };
