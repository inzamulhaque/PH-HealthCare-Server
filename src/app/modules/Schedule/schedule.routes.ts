import express from "express";
import { createSchedule, getAllSchedule } from "./schedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", createSchedule);

router.get("/", auth(UserRole.DOCTOR), getAllSchedule);

const ScheduleRoutes = router;

export default ScheduleRoutes;
