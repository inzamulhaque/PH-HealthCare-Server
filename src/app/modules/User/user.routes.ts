import express from "express";
import { createAdmin } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), createAdmin);

export const UserRoutes = router;
