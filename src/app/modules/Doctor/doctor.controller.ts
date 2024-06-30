import { NextFunction, Request, RequestHandler, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { doctorFilterableFields } from "./doctor.constants";
import {
  deleteDoctorFromDB,
  doctorSoftDelete,
  getAllDoctorsFromDB,
  getDoctorByIdFromDB,
  updateDoctorIntoDB,
} from "./doctor.service";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, doctorFilterableFields);

  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await getAllDoctorsFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctors retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getDoctorById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getDoctorByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor retrieval successfully",
    data: result,
  });
});

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await updateDoctorIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor data updated!",
    data: result,
  });
});

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteDoctorFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor deleted successfully",
    data: result,
  });
});

const softDeleteDoctor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await doctorSoftDelete(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Doctor soft deleted successfully",
    data: result,
  });
});

export {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  softDeleteDoctor,
};
