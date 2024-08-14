import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import {
  createAppointmentIntoDB,
  getMyAppointmentService,
} from "./appointment.service";
import { JwtPayload } from "jsonwebtoken";
import pick from "../../../shared/pick";

const createAppointment = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const user = req.user;

    const result = await createAppointmentIntoDB(user, req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Appointment booked successfully!",
      data: result,
    });
  }
);

const getMyAppointment = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, ["status", "paymentStatus"]);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await getMyAppointmentService(user, filters, options);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My appointment retrive successfully!",
      data: result,
    });
  }
);

export { createAppointment, getMyAppointment };
