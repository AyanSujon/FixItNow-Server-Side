import { Router } from "express";
import { techniciansController } from "./technicians.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
// Get All Technicians  (Public)
router.get("/", techniciansController.getAlltechnicians);
// Technicians  (Private)
router.put("/availability/:id", auth(Role.TECHNICIAN), techniciansController.updateAvailabilitySlots);
router.post("/availability", auth(Role.TECHNICIAN), techniciansController.createAvailabilitySlots);
router.put("/profile", auth(Role.TECHNICIAN), techniciansController.updateTechnicianProfile);
router.get("/bookings", auth(Role.TECHNICIAN), techniciansController.getTechnicianOwnBookings);
router.patch("/bookings/:id", auth(Role.TECHNICIAN), techniciansController.updateBookingStatus);
router.get("/:id", techniciansController.getTechnicianById);
export const techniciansRoutes = router;
//# sourceMappingURL=technicians.route.js.map