import express, { NextFunction, Request, Response } from "express";

import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import {
  createSpecialty,
  deleteSpecialty,
  getAllSpecialty,
} from "./specialties.controller";
import { upload } from "../../../helpars/fileUploader";
import { createSpecialtiesValidtaion } from "./specialties.validation";

const router = express.Router();

// Task 1: Retrieve Specialties Data

/**
- Develop an API endpoint to retrieve all specialties data.
- Implement an HTTP GET endpoint returning specialties in JSON format.
- ENDPOINT: /specialties
*/
router.get("/", getAllSpecialty);

router.post(
  "/",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = createSpecialtiesValidtaion.parse(JSON.parse(req.body.data));
    return createSpecialty(req, res, next);
  }
);

// Task 2: Delete Specialties Data by ID

/**
- Develop an API endpoint to delete specialties by ID.
- Implement an HTTP DELETE endpoint accepting the specialty ID.
- Delete the specialty from the database and return a success message.
- ENDPOINT: /specialties/:id
*/

router.delete(
  "/:id",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  deleteSpecialty
);

const SpecialtiesRoutes = router;

export default SpecialtiesRoutes;
