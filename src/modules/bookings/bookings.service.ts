import { prisma } from "../../lib/prisma";
import { IBooking } from "./bookings.interface"





const createBookingInDB = async (
  payload: IBooking,
  customerId: string
) => {
  const {
    technicianId,
    serviceId,
    note,
  } = payload;

  // Check technician exists
  const technician = await prisma.technicianProfile.findUnique({
    where: {
      id: technicianId,
    },
  });

  if (!technician) {
    throw new Error("Technician not found");
  }

  // Check service exists and belongs to technician
  const service = await prisma.service.findFirst({
    where: {
      id: serviceId,
      technicianId,
      isAvailable: true,
    },
  });

  if (!service) {
    throw new Error("Service not found or unavailable for this technician"
    );
  }

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      customerId,
      technicianId,
      serviceId,
      note,
    },
    include: {
      customer: true,
      technician: {
        include: {
          user: true,
        },
      },
      service: true,
    },
  });

  return booking;
};












export const bookingsService ={
    createBookingInDB,

}