import express from "express";
import {
  deletePatient,
  getAllPatient,
  getPatientById,
  softDeletePatient,
  updatePatient,
} from "./patient.controller";

const router = express.Router();

router.get("/", getAllPatient);

router.get("/:id", getPatientById);

router.patch("/:id", updatePatient);

router.delete("/:id", deletePatient);

router.delete("/soft/:id", softDeletePatient);

const PatientRoutes = router;

export default PatientRoutes;
