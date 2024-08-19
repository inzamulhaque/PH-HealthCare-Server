import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { initPaymentService } from "./payment.service";
import { Request, Response } from "express";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const { appointmentID } = req.params;

  const result = await initPaymentService(appointmentID);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiate successfully",
    data: result,
  });
});

export { initPayment };
