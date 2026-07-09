import { Router } from "express"
import { paymentsController } from "./payments.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();



router.post("/create",   auth(Role.CUSTOMER), paymentsController.createPayments)





export const paymentsRoutes = router;
