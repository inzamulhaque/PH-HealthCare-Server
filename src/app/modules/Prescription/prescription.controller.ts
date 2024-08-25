import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import {
  createNewPrescriptionService,
  getMyPrescriptionService,
} from "./prescription.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const getMyPrescription = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = req.user;

    const result = await getMyPrescriptionService(user, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Prescription fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const createNewPrescription = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const user = req.user;

    const result = await createNewPrescriptionService(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Prescription created successfully!",
      data: result,
    });
  }
);

export { getMyPrescription, createNewPrescription };
