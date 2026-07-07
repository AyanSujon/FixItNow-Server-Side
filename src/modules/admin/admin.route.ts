import { Router } from "express";
import { adminController } from "./admin.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";



const router = Router();


router.get("/users", auth(Role.ADMIN), adminController.getAllUsers)






export const adminRoutes = router;
