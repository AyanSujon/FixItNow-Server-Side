import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";





const router = Router();





router.post("/", auth(Role.CUSTOMER), reviewsController.createReview);








export const reviewsRoutes = router; 
