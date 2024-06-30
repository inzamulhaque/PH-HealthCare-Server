import { Request, Response } from "express";
import {
  changeProfileStatusIntoDB,
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllUserFromDB,
  getMyProfileFromDB,
  updateMyProfieIntoDB,
} from "./user.services";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import { JwtPayload } from "jsonwebtoken";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await createAdminIntoDB(req);

  res.status(200).json({
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await createDoctorIntoDB(req);

  res.status(200).json({
    success: true,
    message: "Doctor Created successfuly!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await createPatientIntoDB(req);

  res.status(200).json({
    success: true,
    message: "Patient Created successfuly!",
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.query)
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await getAllUserFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const changeProfileStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await changeProfileStatusIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

const getMyProfile = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const result = await getMyProfileFromDB(req.user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfie = catchAsync(
  async (req: Request & JwtPayload, res: Response) => {
    const user = req.user;

    const result = await updateMyProfieIntoDB(user, req);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My profile updated!",
      data: result,
    });
  }
);

export {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser,
  changeProfileStatus,
  getMyProfile,
  updateMyProfie,
};
