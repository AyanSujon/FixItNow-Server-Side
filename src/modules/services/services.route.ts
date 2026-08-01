import { Router } from "express";
import { servicesController } from "./services.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";



const router = Router();



router.post("/create", auth(Role.TECHNICIAN), servicesController.createService);
router.get("/", servicesController.getAllServices);
router.get("/:id", servicesController.getSingleServiceById)
router.get("/technician/:id", auth(Role.TECHNICIAN), servicesController.getAllServiceByTechnicianId)
router.patch("/technician/:id/edit", auth(Role.TECHNICIAN), servicesController.EditServiceByTechnicianId)















export const servicesRoutes = router;
