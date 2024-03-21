import { Router } from "express";
import { loginUser } from "./auth.controller";

const router: Router = Router();

router.post("/login", loginUser);

export const AuthRoutes = router;
