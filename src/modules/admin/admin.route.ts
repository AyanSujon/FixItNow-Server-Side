import { Router } from "express";
import { adminController } from "./admin.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middlewares/auth";



const router = Router();


router.get("/users", auth(Role.ADMIN), adminController.getAllUsers);

router.patch("/users/:id", auth(Role.ADMIN), adminController.UpdateUserStatus);

router.post("/categories", auth(Role.ADMIN), adminController.createServiceCategory);

router.get("/categories", auth(Role.ADMIN), adminController.getAllCategories);





export const adminRoutes = router;
