import express from "express";
import { createSchedule } from "./schedule.controller";

const router = express.Router();

router.post("/", createSchedule);

const ScheduleRoutes = router;

export default ScheduleRoutes;
