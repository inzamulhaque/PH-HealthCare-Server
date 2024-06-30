import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import {
  createDoctorShedilesIntoDB,
  getMyScheduleService,
} from "./doctorSchedule.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

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

const getMySchedule = catchAsync(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate", "isBooked"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await getMyScheduleService(
      filters,
      options,
      user as JwtPayload
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My Schedule fetched successfully!",
      data: result,
    });
  }
);

export { createDoctorShediles, getMySchedule };
