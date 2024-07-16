import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { createAppointmentIntoDB } from "./appointment.service";
import { JwtPayload } from "jsonwebtoken";

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

export { createAppointment };
