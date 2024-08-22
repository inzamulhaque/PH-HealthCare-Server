import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { createNewPrescriptionService } from "./prescription.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

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

export { createNewPrescription };
