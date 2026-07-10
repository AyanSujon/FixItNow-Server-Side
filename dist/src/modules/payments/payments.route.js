import { Router } from "express";
import { paymentsController } from "./payments.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/create", auth(Role.CUSTOMER), paymentsController.createPayments);
// router.post("/confirm",   auth(Role.CUSTOMER), paymentsController.confirmPayment)
router.post("/checkout", auth(Role.CUSTOMER), paymentsController.createCheckoutSeassion);
router.post("/webhook", paymentsController.handleWebhook);
router.get("/", auth(Role.CUSTOMER), paymentsController.getAllPaymentHistory);
router.get("/:id", auth(Role.CUSTOMER), paymentsController.getPaymentDetailsById);
export const paymentsRoutes = router;
//# sourceMappingURL=payments.route.js.map