import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { createScheduleIntoDB } from "./schedule.sevice";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

export { createSchedule };
