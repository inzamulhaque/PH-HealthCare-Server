import { Router } from "express";
import {
  adminSoftDelete,
  deleteAdminById,
  getAdminById,
  getAllAdmin,
  updateAdminById,
} from "./admin.controller";

const router: Router = Router();

router.get("/", getAllAdmin);

router.get("/:id", getAdminById);

router.patch("/:id", updateAdminById);

router.delete("/:id", deleteAdminById);

router.delete("/soft/:id", adminSoftDelete);

export const AdminRoutes = router;
