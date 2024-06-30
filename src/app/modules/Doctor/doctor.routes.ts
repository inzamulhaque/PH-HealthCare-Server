import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import {
  deleteDoctor,
  getAllDoctors,
  getDoctorById,
  softDeleteDoctor,
  updateDoctor,
} from "./doctor.controller";
import {
  createDoctorValidationSchema,
  updateDoctorValidationSchema,
} from "./doctor.validation";

const router = express.Router();

// task 3
router.get("/", getAllDoctors);

//task 4
router.get("/:id", getDoctorById);

router.patch(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
  validateRequest(updateDoctorValidationSchema),
  updateDoctor
);

//task 5
router.delete("/:id", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), deleteDoctor);

// task 6
router.delete(
  "/soft/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  softDeleteDoctor
);

const DoctorRoutes = router;

export default DoctorRoutes;
