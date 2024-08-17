import { Router } from "express";
import { initPayment } from "./payment.controller";

const router: Router = Router();

router.post("/init-payment", initPayment);

const PaymentRoutes = router;
export default PaymentRoutes;
