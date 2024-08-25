import { Router } from "express";
import {
  createNewPrescription,
  getMyPrescription,
} from "./prescription.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.get("/my-prescription", auth(UserRole.PATIENT), getMyPrescription);

router.post("/", auth(UserRole.DOCTOR), createNewPrescription);

const PrescriptionRoutes = router;
export default PrescriptionRoutes;
