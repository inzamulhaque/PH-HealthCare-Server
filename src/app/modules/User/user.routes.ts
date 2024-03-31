import express, { NextFunction, Request, Response } from "express";
import {
  changeProfileStatus,
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser,
  getMyProfile,
} from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../helpars/fileUploader";
import {
  createAdminValidationSchema,
  createDoctorValidationSchema,
  createPatientValidationSchema,
  updateStatusValidationSchema,
} from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), getAllUser);

router.get(
  "/me",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  getMyProfile
);

router.post(
  "/create-admin",
  upload.single("file"),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createAdminValidationSchema.parse(JSON.parse(req.body.data));
    return createAdmin(req, res, next);
  }
);

router.post(
  "/create-doctor",
  upload.single("file"),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createDoctorValidationSchema.parse(JSON.parse(req.body.data));
    return createDoctor(req, res, next);
  }
);

router.post(
  "/create-patient",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createPatientValidationSchema.parse(JSON.parse(req.body.data));
    return createPatient(req, res, next);
  }
);

router.patch(
  "/:id/status",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(updateStatusValidationSchema),
  changeProfileStatus
);

export const UserRoutes = router;
