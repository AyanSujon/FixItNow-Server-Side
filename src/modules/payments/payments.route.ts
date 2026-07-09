import { Router } from "express"
import { paymentsController } from "./payments.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/create",   auth(Role.CUSTOMER), paymentsController.createPayments)
// router.post("/confirm",   auth(Role.CUSTOMER), paymentsController.confirmPayment)
router.post("/checkout",   auth(Role.CUSTOMER), paymentsController.createCheckoutSeassion)





export const paymentsRoutes = router;
