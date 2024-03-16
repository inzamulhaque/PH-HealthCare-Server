import { Router } from "express";
import { getAllAdmin } from "./admin.controller";

const router: Router = Router();

router.get("/", getAllAdmin);

export const AdminRoutes = router;
