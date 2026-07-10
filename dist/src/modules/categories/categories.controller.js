import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { categoriesService } from "./categories.service";
const getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await categoriesService.getAllCategoriesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Patched All Service Category successfully",
        data: categories,
    });
});
export const categoriesController = {
    getAllCategories,
};
//# sourceMappingURL=categories.controller.js.map