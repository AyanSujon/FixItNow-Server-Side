import { prisma } from "../../lib/prisma";
import { IBooking } from "./bookings.interface"





// const createBookingInDB = async (
//   payload: IBooking,
//   customerId: string
// ) => {
//   const {
//     technicianId,
//     serviceId,
//     note,
//     bookingSlotIds
//   } = payload;

//   // Check technician exists
//   const technician = await prisma.technicianProfile.findUnique({
//     where: {
//       id: technicianId,
//     },
//   });

//   if (!technician) {
//     throw new Error("Technician not found");
//   }

//   // Check service exists and belongs to technician
//   const service = await prisma.service.findFirst({
//     where: {
//       id: serviceId,
//       technicianId: technician.id,
//       isAvailable: true,
//     },
//   });

//   if (!service) {
//     throw new Error("Service not found or unavailable for this technician"
//     );
//   }



//     // Check slots
//   const slots = await prisma.bookingSlot.findMany({
//     where: {
//       id: {
//         in: bookingSlotIds,
//       },
//       serviceId,
//       isAvailable: true,
//       isBooked: false,
//     },
//   });

//   if (slots.length !== bookingSlotIds.length) {
//     throw new Error("One or more booking slots are unavailable");
//   }

//   // Create booking
//   const booking = await prisma.booking.create({
//     data: {
//       customerId,
//       technicianId,
//       serviceId,
//       note,
//     },
//     include: {
//       customer: true,
//       technician: {
//         include: {
//           user: true,
//         },
//       },
//       service: true,
//     },
//   });

//   return booking;
// };






const createBookingInDB = async (
  payload: IBooking,
  customerId: string
) => {
  const {
    technicianId,
    serviceId,
    note,
    bookingSlotIds,
  } = payload;

  // Check technician
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
      technicianId: technician.id,
      isAvailable: true,
    },
  });

  if (!service) {
    throw new Error("Service not found or unavailable for this technician");
  }

  // Check slots
  const slots = await prisma.bookingSlot.findMany({
    where: {
      id: {
        in: bookingSlotIds,
      },
      serviceId,
      isAvailable: true,
      isBooked: false,
    },
  });

  if (slots.length !== bookingSlotIds.length) {
    throw new Error("One or more booking slots are unavailable");
  }

  const booking = await prisma.$transaction(async (tx) => {
    // Create booking
    const newBooking = await tx.booking.create({
      data: {
        customerId,
        technicianId,
        serviceId,
        note,
      },
    });

    // Update slots
    await tx.bookingSlot.updateMany({
      where: {
        id: {
          in: bookingSlotIds,
        },
      },
      data: {
        bookingId: newBooking.id,
        isBooked: true,
        isAvailable: false,
        bookedCount: {
          increment: 1,
        },
      },
    });

    return tx.booking.findUnique({
      where: {
        id: newBooking.id,
      },
      include: {
        customer: true,
        technician: {
          include: {
            user: true,
          },
        },
        service: true,
        bookingSlots: true
      },
    });
  });

  return booking;
};










const getAllBookingsFromDB = async () => {
  const bookings = await prisma.booking.findMany({
    include: {
      customer: true,
      technician: true,
      service: true,
      bookingSlots: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return bookings;
};





const getBookingsByIdFromDB = async (id: string) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      customer: true,
      technician: true,
      service: true,
      bookingSlots: true,
    },
  });

  if (!booking) {
    throw new Error( "Booking not found.");
  }

  return booking;
};








export const bookingsService = {
  createBookingInDB,
  getAllBookingsFromDB,
  getBookingsByIdFromDB,


}