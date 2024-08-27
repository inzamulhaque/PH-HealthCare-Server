import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { createNewReview } from "./review.controller";

const router: Router = Router();

router.post("/", auth(UserRole.PATIENT), createNewReview);

const ReviewRouter = router;
export default ReviewRouter;
