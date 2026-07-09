import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payments.service";
import HttpStatus from "http-status";



const createPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const customerId = req.user?.id;
    const payload =req.body;

    console.log("controller : ", customerId, payload)

    const result = await paymentService.createPaymentsInDB(customerId as string, payload);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Payment intent created successfully",
      data: result,
    });
  }
);



// const confirmPayment = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {

//     // console.log("payment controller: " ,req.body)

//     const result = await paymentService.confirmPaymentInDB(req.body);

//     sendResponse(res, {
//       success: true,
//       statusCode: 200,
//       message: "Payment confirmed successfully.",
//       data: result,
//     });
//   }
// );








const createCheckoutSeassion = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
  const userid = req.user?.id; 


  const result = await paymentService.createCheckoutSeassion(userid as string);

     sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Checkout complated successfully",
      data: result,
    });
})










export const paymentsController ={
    createPayments,
    // confirmPayment,
    createCheckoutSeassion,


}