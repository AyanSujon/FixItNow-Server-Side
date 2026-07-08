import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { servicesService } from "./services.service";
import jwt from "jsonwebtoken";










const createService = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    if (!req.user) {
        throw new Error("Unauthorized");
    }

    
    const userid = req.user?.id; // Requested User/Technician
    const payload = req.body;

    console.log("create service: ", userid, payload)


    const service = await servicesService.createServiceInDB(payload, userid);


    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Service created successfully.",
        data: service,
    });


})


export const servicesController = {
    createService,

}