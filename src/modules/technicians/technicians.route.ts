import { Router } from "express";
import { techniciansController } from "./technicians.controller";


const router = Router();


// Get All Technicians 
router.get("/", techniciansController.getAlltechnicians);

router.get("/:id", techniciansController.getTechnicianById);






export const techniciansRoutes = router;

