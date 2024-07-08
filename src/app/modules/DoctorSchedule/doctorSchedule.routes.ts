import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createDoctorScheduleValidationSchema } from "./doctorSchedule.validation";
import {
  createDoctorShediles,
  deleteScheduleFromDB,
  getMySchedule,
} from "./doctorSchedule.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";

const router: Router = Router();

router.post(
  "/",
  auth(UserRole.DOCTOR),
  validateRequest(createDoctorScheduleValidationSchema),
  createDoctorShediles
);

router.get("/my-schedule", auth(UserRole.DOCTOR), getMySchedule);

router.delete("/:id", auth(UserRole.DOCTOR), deleteScheduleFromDB);

const DoctorScheduleRoutes = router;

export default DoctorScheduleRoutes;
