import { Router } from "express";
import {
  changeAppointmentStatus,
  createAppointment,
  getMyAppointment,
} from "./appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post("/", auth(UserRole.PATIENT), createAppointment);

router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  getMyAppointment
);

router.patch(
  "/status/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  changeAppointmentStatus
);

const AppointmentRoutes = router;
export default AppointmentRoutes;
