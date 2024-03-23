import { Router } from "express";
import {
  adminSoftDelete,
  deleteAdminById,
  getAdminById,
  getAllAdmin,
  updateAdminById,
} from "./admin.controller";
import validateRequest from "../../middlewares/validateRequest";
import { adminUpdatevalidationSchema } from "./admin.validations";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.get("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), getAllAdmin);

router.get("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), getAdminById);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(adminUpdatevalidationSchema),
  updateAdminById
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteAdminById
);

router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  adminSoftDelete
);

export const AdminRoutes = router;
