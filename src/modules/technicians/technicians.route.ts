import { Router } from "express";
import { techniciansController } from "./technicians.controller";


const router = Router();


// Get All Technicians 
router.get("/", techniciansController.getAlltechnicians)







export const techniciansRoutes = router;

