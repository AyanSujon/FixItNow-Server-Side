import { Router } from "express";
import { servicesController } from "./services.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";



const router = Router();



router.post("/create", auth(Role.TECHNICIAN), servicesController.createService)




export const servicesRoutes = router;
