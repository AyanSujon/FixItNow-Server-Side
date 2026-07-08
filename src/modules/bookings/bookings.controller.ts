import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { bookingsService } from "./bookings.service";


const createBookings = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

     if (!req.user) {
        throw new Error("Unauthorized");
    }

    const customerId = req.user?.id;


    const payload = req.body; 

    const createdBooking = await bookingsService.createBookingInDB(payload, customerId);




    sendResponse(res, {
        success: true,
        message: "Your Booking created successfully.", 
        statusCode: HttpStatus.CREATED,
        data: createdBooking,
    })

})









export const bookingsController ={
    createBookings,

}