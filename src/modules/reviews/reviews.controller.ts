import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { reviewsService } from "./reviews.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";




const createReview = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const customerId = req.user?.id as string; 
    const payload = req.body;

    
    const review = await reviewsService.createReviewInDB(customerId, payload);


    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Review Created successfully.",
        data: review
    })

})






















export const reviewsController= {
    createReview,

}