import { Router } from "express";
import { createAppointment, getMyAppointment } from "./appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post("/", auth(UserRole.PATIENT), createAppointment);

router.get(
  "/my-appointment",
  auth(UserRole.PATIENT, UserRole.DOCTOR),
  getMyAppointment
);

const AppointmentRoutes = router;
export default AppointmentRoutes;
