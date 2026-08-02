import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingsController } from "./bookings.controller";




const router = Router();



router.post("/create", auth(Role.CUSTOMER), bookingsController.createBookings);
router.get("/", auth(Role.CUSTOMER), bookingsController.getAllBookings);
router.get("/:id", auth(Role.CUSTOMER), bookingsController.getBookingsById);
router.patch("/:id", auth(Role.TECHNICIAN), bookingsController.updateBookingStatusById);










export const  bookingsRoutes = router;
