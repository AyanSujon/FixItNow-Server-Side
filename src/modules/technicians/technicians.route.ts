import { Router } from "express";
import { techniciansController } from "./technicians.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();


// Get All Technicians  (Public)
router.get("/", techniciansController.getAlltechnicians);

router.get("/:id", techniciansController.getTechnicianById);



// Technicians  (Private)
router.put("/availability", auth(Role.TECHNICIAN), techniciansController.updateAvailabilitySlots);
router.post("/availability", auth(Role.TECHNICIAN), techniciansController.createAvailabilitySlots);

export const techniciansRoutes = router;

