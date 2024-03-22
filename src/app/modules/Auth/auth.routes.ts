import { Router } from "express";
import { loginUser, refreshToken } from "./auth.controller";

const router: Router = Router();

router.post("/login", loginUser);

router.post("/refresh-token", refreshToken);

export const AuthRoutes = router;
