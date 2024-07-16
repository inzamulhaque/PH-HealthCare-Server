import { Router } from "express";
import { createAppointment } from "./appointment.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post("/", auth(UserRole.PATIENT), createAppointment);

const AppointmentRoutes = router;
export default AppointmentRoutes;
