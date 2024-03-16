import { Request, Response } from "express";
import { getAllAdminFromDB } from "./admin.service";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const result = await getAllAdminFromDB(req.query);

    res.status(200).json({
      success: true,
      message: "Admin Data Fetched!",
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

export { getAllAdmin };
