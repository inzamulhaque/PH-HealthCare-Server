import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  loginUser,
  refreshToken,
  resetPassword,
} from "./auth.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router: Router = Router();

router.post("/login", loginUser);

router.post("/refresh-token", refreshToken);

router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  changePassword
);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export const AuthRoutes = router;
