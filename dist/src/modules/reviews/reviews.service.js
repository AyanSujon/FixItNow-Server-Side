import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
const createReviewInDB = async (customerId, payload) => {
    const { bookingId, technicianId, serviceId, rating, comment } = payload;
    // Check booking exists
    const booking = await prisma.booking.findUniqueOrThrow({
        where: {
            id: bookingId,
        },
    });
    // Only the customer who created the booking can review
    if (booking.customerId !== customerId) {
        throw new Error("You are not authorized to review this booking.");
    }
    // Booking must be completed
    if (booking.status !== BookingStatus.COMPLETED) {
        throw new Error("You can only review completed bookings.");
    }
    // Prevent duplicate review
    const existingReview = await prisma.review.findUnique({
        where: {
            bookingId,
        },
    });
    if (existingReview) {
        throw new Error("You have already reviewed this booking.");
    }
    // Optional: Ensure technician matches booking
    if (booking.technicianId !== technicianId) {
        throw new Error("Invalid technician.");
    }
    // Optional: Ensure service matches booking
    if (serviceId && booking.serviceId !== serviceId) {
        throw new Error("Invalid service.");
    }
    const review = await prisma.review.create({
        data: {
            customerId,
            technicianId,
            bookingId,
            serviceId,
            rating,
            comment,
        },
        include: {
            customer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            }
        },
    });
    return review;
};
export const reviewsService = {
    createReviewInDB
};
//# sourceMappingURL=reviews.service.js.map