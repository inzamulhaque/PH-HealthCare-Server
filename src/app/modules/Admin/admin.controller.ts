import { NextFunction, Request, Response } from "express";
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

const getAllAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
  } catch (error: any) {
    next(error);
  }
};

const getAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await getAdminByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Fetched By ID!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateAdminByIdIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Updated By ID!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const deleteAdminById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted By ID!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const adminSoftDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await adminSoftDeleteByIdFromDB(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Admin Data Deleted By ID!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  adminSoftDelete,
};
