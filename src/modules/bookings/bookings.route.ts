import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingsController } from "./bookings.controller";




const router = Router();



router.post("/create", auth(Role.CUSTOMER), bookingsController.createBookings);
router.get("/", auth(Role.CUSTOMER), bookingsController.getAllBookings);










export const  bookingsRoutes = router;
