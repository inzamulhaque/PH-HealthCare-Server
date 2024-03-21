import express from "express";
import { createAdmin } from "./user.controller";

const router = express.Router();

router.post("/", createAdmin);

export const UserRoutes = router;
