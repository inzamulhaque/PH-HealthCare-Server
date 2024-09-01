import { Router } from "express";
import { fetchDashboardMetaData } from "./meta.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  fetchDashboardMetaData
);

const MetaRouter = router;
export default MetaRouter;
