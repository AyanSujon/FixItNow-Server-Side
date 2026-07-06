import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { techniciansService } from "./technicians.service";


const getAlltechnicians = catchAsync(async(req: Request, res: Response, next: NextFunction)=> {
    const filters = req.query;

    const technicians = await techniciansService.getAlltechniciansFromDB(filters);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK, 
        message: "User profile fetched successfully.",
        data: {technicians}
    })


    res.send("Get All technicians")
})














export const techniciansController = {
    getAlltechnicians,

}