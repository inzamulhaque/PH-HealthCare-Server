import { Request, Response } from "express";
import {
  adminSoftDeleteByIdFromDB,
  deleteAdminByIdFromDB,
  getAdminByIdFromDB,
  getAllAdminFromDB,
  updateAdminByIdIntoDB,
} from "./admin.service";
import { adminFilterableFields } from "./admin.constant";
import pick from "../../../shared/pick";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await getAllAdminFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getAdminByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Fetched By ID!",
    data: result,
  });
});

const updateAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await updateAdminByIdIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Updated By ID!",
    data: result,
  });
});

const deleteAdminById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteAdminByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted By ID!",
    data: result,
  });
});

const adminSoftDelete = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await adminSoftDeleteByIdFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Data Deleted By ID!",
    data: result,
  });
});

export {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  adminSoftDelete,
};
