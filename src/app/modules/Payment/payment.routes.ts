import { Router } from "express";
import { initPayment, validatePayment } from "./payment.controller";

const router: Router = Router();

router.get("/ipn", validatePayment);

router.post("/init-payment/:appointmentID", initPayment);

const PaymentRoutes = router;
export default PaymentRoutes;
