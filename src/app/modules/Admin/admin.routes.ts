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

const router: Router = Router();

router.get("/", getAllAdmin);

router.get("/:id", getAdminById);

router.patch(
  "/:id",
  validateRequest(adminUpdatevalidationSchema),
  updateAdminById
);

router.delete("/:id", deleteAdminById);

router.delete("/soft/:id", adminSoftDelete);

export const AdminRoutes = router;
