import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
  createScheduleIntoDB,
  deleteScheduleFromDB,
  getAllScheduleFromDB,
  getScheduleByIdFromDB,
} from "./schedule.sevice";
import { JwtPayload } from "jsonwebtoken";
import pick from "../../../shared/pick";

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await createScheduleIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule created successfully!",
    data: result,
  });
});

const getAllSchedule = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const filters = pick(req.query, ["startDate", "endDate"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const user = req.user;
    const result = await getAllScheduleFromDB(filters, options, user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Schedule fetched successfully!",
      data: result,
    });
  }
);

const getScheduleById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getScheduleByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule retrieval successfully",
    data: result,
  });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteScheduleFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Schedule deleted successfully",
    data: result,
  });
});

export { createSchedule, getAllSchedule, getScheduleById, deleteSchedule };
