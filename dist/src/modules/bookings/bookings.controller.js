import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
import { bookingsService } from "./bookings.service";
const createBookings = catchAsync(async (req, res, next) => {
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
    });
});
const getAllBookings = catchAsync(async (req, res, next) => {
    const bookings = await bookingsService.getAllBookingsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Bookings fetched successfully.",
        data: bookings,
    });
});
const getBookingsById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const booking = await bookingsService.getBookingsByIdFromDB(id);
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Booking fetched successfully.",
        data: booking,
    });
});
export const bookingsController = {
    createBookings,
    getAllBookings,
    getBookingsById,
};
//# sourceMappingURL=bookings.controller.js.map