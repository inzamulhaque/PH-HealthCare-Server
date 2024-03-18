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

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await getAllAdminFromDB(filters, options);

    res.status(200).json({
      success: true,
      message: "Admin Data Fetched!",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error,
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await getAdminByIdFromDB(id);

    res.status(200).json({
      success: true,
      message: "Admin Data Fetched By ID!",
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

const updateAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await updateAdminByIdIntoDB(id, req.body);

    res.status(200).json({
      success: true,
      message: "Admin Data Updated By ID!",
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

const deleteAdminById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteAdminByIdFromDB(id);

    res.status(200).json({
      success: true,
      message: "Admin Data Deleted By ID!",
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

const adminSoftDelete = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await adminSoftDeleteByIdFromDB(id);
    res.status(200).json({
      success: true,
      message: "Admin Data Deleted By ID!",
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

export {
  getAllAdmin,
  getAdminById,
  updateAdminById,
  deleteAdminById,
  adminSoftDelete,
};
