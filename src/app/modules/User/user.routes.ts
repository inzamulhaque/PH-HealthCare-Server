import express, { NextFunction, Request, Response } from "express";
import { createAdmin, createDoctor } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../helpars/fileUploader";
import {
  createAdminValidationSchema,
  createDoctorValidationSchema,
} from "./user.validation";

const router = express.Router();

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

export const UserRoutes = router;
