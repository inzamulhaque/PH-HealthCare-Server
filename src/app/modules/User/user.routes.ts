import express from "express";
import { createAdmin } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { upload } from "../../../helpars/fileUploader";

const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  createAdmin
);

export const UserRoutes = router;
