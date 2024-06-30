import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
  createSpecialtyIntoDB,
  deleteSpecialtyFromDB,
  getAllSpecialtyFromDB,
} from "./specialties.service";

const createSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await createSpecialtyIntoDB(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties created successfully!",
    data: result,
  });
});

const getAllSpecialty = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllSpecialtyFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialties data fetched successfully",
    data: result,
  });
});

const deleteSpecialty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteSpecialtyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Specialty deleted successfully",
    data: result,
  });
});

export { createSpecialty, getAllSpecialty, deleteSpecialty };
