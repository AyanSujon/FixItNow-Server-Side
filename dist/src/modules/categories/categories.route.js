import { Router } from "express";
import { categoriesController } from "./categories.controller";
const router = Router();
// Get All categories
router.get("/", categoriesController.getAllCategories);
export const categoriesRoutes = router;
//# sourceMappingURL=categories.route.js.map