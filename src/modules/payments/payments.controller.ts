import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payments.service";
import HttpStatus from "http-status";



const createPayments = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    const customerId = req.user?.id;
    const payload =req.body;

    // console.log("controller : ", customerId, payload)

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
  const { bookingId } = req.body;
  // console.log(bookingId ,"from controller");
  const result = await paymentService.createCheckoutSeassion(userid as string, bookingId as string);

     sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "Checkout complated successfully",
      data: result,
    });
})








const handleWebhook = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{
    const event = req.body as Buffer;
const signature = req.headers['stripe-signature']!;

await paymentService.handleWebhook(event, signature as string);


sendResponse(res,{
  success: true,
  statusCode: HttpStatus.OK,
  message: "Webhook triggered successfully.",
  data: null
})

})







const getAllPaymentHistory = catchAsync(async(req: Request, res: Response, next: NextFunction)=>{

    const userId = req.user?.id;

    
    const AllPaymentHistory = await paymentService.getAllPaymentHistoryFromDB(userId as string);

    sendResponse(res, {
      success: true,
      statusCode: HttpStatus.OK,
      message: "All Payment History patched successfully",
      data: AllPaymentHistory,
    });
})

















































export const paymentsController ={
    createPayments,
    // confirmPayment,
    createCheckoutSeassion,
    handleWebhook,
    getAllPaymentHistory,




}