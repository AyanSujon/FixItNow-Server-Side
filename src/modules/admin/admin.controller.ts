import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { adminService } from "./admin.service";
import { userStatus } from "../../../generated/prisma/enums";



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













export const adminController = {
    getAllUsers,
    UpdateUserStatus,


}