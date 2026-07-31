import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";





const router = Router();





router.post("/", auth(Role.CUSTOMER), reviewsController.createReview);

router.get("/", auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN), reviewsController.getAllReviews);








export const reviewsRoutes = router; 
