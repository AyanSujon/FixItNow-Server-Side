import { catchAsync } from "../../utils/catchAsync";
import { reviewsService } from "./reviews.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
const createReview = catchAsync(async (req, res, next) => {
    const customerId = req.user?.id;
    const payload = req.body;
    const review = await reviewsService.createReviewInDB(customerId, payload);
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: "Review Created successfully.",
        data: review
    });
});
export const reviewsController = {
    createReview,
};
//# sourceMappingURL=reviews.controller.js.map