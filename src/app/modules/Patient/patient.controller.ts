import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { patientFilterableFields } from "./patient.constants";
import {
  deletePatientFromDB,
  getAllPatientFromDB,
  getPatientByIdFromDB,
  patientSoftDeleteIntoDB,
  updatePatientIntoDB,
} from "./patient.services";

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, patientFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await getAllPatientFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient retrieval successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getPatientById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getPatientByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient retrieval successfully",
    data: result,
  });
});

const updatePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await updatePatientIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient updated successfully",
    data: result,
  });
});

const deletePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deletePatientFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient deleted successfully",
    data: result,
  });
});

const softDeletePatient = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await patientSoftDeleteIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Patient soft deleted successfully",
    data: result,
  });
});

export {
  getAllPatient,
  getPatientById,
  updatePatient,
  deletePatient,
  softDeletePatient,
};
