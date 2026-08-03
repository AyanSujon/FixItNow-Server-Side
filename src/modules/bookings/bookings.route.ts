import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { bookingsController } from "./bookings.controller";




const router = Router();



router.post("/create", auth(Role.CUSTOMER), bookingsController.createBookings);
router.get("/", auth(Role.CUSTOMER, Role.TECHNICIAN, Role.ADMIN), bookingsController.getAllBookings);
router.get("/:id", auth(Role.CUSTOMER, Role.TECHNICIAN), bookingsController.getBookingsById);
router.patch("/:id", auth(Role.TECHNICIAN), bookingsController.updateBookingStatusById);

router.get("/technician/:id", auth(Role.TECHNICIAN), bookingsController.getAllBookingsByTechnician);








export const  bookingsRoutes = router;
