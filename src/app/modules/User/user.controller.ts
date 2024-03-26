import { Request, Response } from "express";
import { createAdminIntoDB, createDoctorIntoDB } from "./user.services";
import catchAsync from "../../../shared/catchAsync";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await createAdminIntoDB(req);

  res.status(200).json({
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await createDoctorIntoDB(req);

  res.status(200).json({
    success: true,
    message: "Doctor Created successfuly!",
    data: result,
  });
});

export { createAdmin, createDoctor };
