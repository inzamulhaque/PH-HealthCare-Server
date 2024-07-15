import express from "express";
import {
  createSchedule,
  deleteSchedule,
  getAllSchedule,
  getScheduleById,
} from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", createSchedule);

router.get("/", auth(UserRole.DOCTOR), getAllSchedule);

router.get(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  getScheduleById
);

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteSchedule
);

const ScheduleRoutes = router;

export default ScheduleRoutes;
