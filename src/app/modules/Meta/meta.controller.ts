import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { fetchDashboardMetaDataService } from "./meta.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";

const fetchDashboardMetaData = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const user = req.user;

    const result = await fetchDashboardMetaDataService(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Meta data retrieval successfully!",
      data: result,
    });
  }
);

export { fetchDashboardMetaData };
