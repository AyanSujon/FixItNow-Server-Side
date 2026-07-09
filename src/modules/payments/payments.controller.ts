import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payments.service";




const createPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const customerId = req.user?.id;
    const payload =req.body;

    console.log("controller : ", customerId, payload)

    const result = await paymentService.createPaymentsInDB(customerId as string, payload);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment intent created successfully",
      data: result,
    });
  }
);













export const paymentsController ={
    createPayments,

}