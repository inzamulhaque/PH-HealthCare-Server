import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { createDoctorShedilesIntoDB } from "./doctorSchedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createDoctorShediles = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const user = req.user;
    const result = await createDoctorShedilesIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Doctor Schedule created successfully!",
      data: result,
    });
  }
);

export { createDoctorShediles };
