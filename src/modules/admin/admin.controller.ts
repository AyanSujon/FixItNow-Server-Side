import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { adminService } from "./admin.service";
import { userStatus } from "../../../generated/prisma/enums";
import { createServiceCategoryPlayload } from "./admin.interface";



const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const filters = {
        ...req.query,
        isVerified:
            req.query.isVerified !== undefined
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
    })
})






const UpdateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { userStatus } = req.body;

    const result = await adminService.updateUserStatus(id as string, userStatus as userStatus);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "User status updated successfully",
        data: result,
    });


})







const createServiceCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const payload = req.body;

    const category = await adminService.createServiceCategoryInDB(payload);



    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Category Created successfully",
        data: category,
    });

})




const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const categories = await adminService.getAllCategoriesFromDB();


    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Patched All Service Category successfully",
        data: categories,
    });
})



export const adminController = {
    getAllUsers,
    UpdateUserStatus,
    createServiceCategory,
    getAllCategories

}