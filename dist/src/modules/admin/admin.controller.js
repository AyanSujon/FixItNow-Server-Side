import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { adminService } from "./admin.service";
const getAllUsers = catchAsync(async (req, res, next) => {
    const filters = {
        ...req.query,
        isVerified: req.query.isVerified !== undefined
            ? req.query.isVerified === "true"
            : undefined,
    };
    const { users, meta } = await adminService.getAllUserFromDB(filters);
    sendResponse(res, {
        success: true,
        message: "User is logged in successfully.",
        statusCode: HttpStatus.OK,
        data: users,
        meta: meta,
    });
});
const UpdateUserStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { userStatus } = req.body;
    const result = await adminService.updateUserStatus(id, userStatus);
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "User status updated successfully",
        data: result,
    });
});
const createServiceCategory = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const category = await adminService.createServiceCategoryInDB(payload);
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Category Created successfully",
        data: category,
    });
});
const getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await adminService.getAllCategoriesFromDB();
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Patched All Service Category successfully",
        data: categories,
    });
});
const getAllBookings = catchAsync(async (req, res, next) => {
    const bookings = await adminService.getAllBookingsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Bookings fetched successfully.",
        data: bookings,
    });
});
export const adminController = {
    getAllUsers,
    UpdateUserStatus,
    createServiceCategory,
    getAllCategories,
    getAllBookings
};
//# sourceMappingURL=admin.controller.js.map