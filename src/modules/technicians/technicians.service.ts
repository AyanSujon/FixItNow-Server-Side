import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IBookingSlot, TechnicianFilters } from "./technicians.interface";





// Filter By:
// GET /api/technicians
// GET /api/technicians?city=Dhaka
// GET /api/technicians?profession=PLUMBER
// GET /api/technicians?city=Dhaka&profession=PLUMBER
// GET /api/technicians?isAvailable=true&isApproved=true
// GET /api/technicians?minRating=3&minExperience=1
// GET /api/technicians?city=Dhaka&profession=PLUMBER&isAvailable=true&page=1&limit=10
// Pagination 
// GET /api/technicians?page=4&limit=1 



const getAlltechniciansFromDB = async (filters: TechnicianFilters) => {
  // Pagination
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  const where = {
    role: Role.TECHNICIAN,
    technicianProfile: {
      ...(filters.city && {
        city: {
          equals: filters.city,
          mode: "insensitive" as const,
        },
      }),

      ...(filters.profession && {
        profession: {
          equals: filters.profession,
        },
      }),

      ...(filters.isAvailable !== undefined && {
        isAvailable: filters.isAvailable,
      }),

      ...(filters.isApproved !== undefined && {
        isApproved: filters.isApproved,
      }),

      ...(filters.minExperience && {
        yearsOfExperience: {
          gte: filters.minExperience,
        },
      }),

      ...(filters.minRating && {
        averageRating: {
          gte: filters.minRating,
        },
      }),

      ...(filters.maxHourlyRate && {
        hourlyRate: {
          lte: filters.maxHourlyRate,
        },
      }),
    },
  };

  // Total matching technicians
  const total = await prisma.user.count({
    where,
  });

  // Paginated technicians
  const technicians = await prisma.user.findMany({
    where,
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
    skip,
    take: limit,
  });

  return {
    technicians,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};






const getTechnicianByIdFromDB = async (id: string) => {


  const technician = await prisma.user.findUnique({
    where: {
      id: id,
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  })
  
  return technician;

};






const updateAvailabilitySlotsinDB = async (
  id: string,
  payload: IBookingSlot
) => {

  const {serviceId, date, startsAt, endsAt, isAvailable, isBooked, note, bookingDeadline, maxBookings} = payload;
  // Check slot exists
  const slot = await prisma.bookingSlot.findUnique({
    where: { id },
  });

  if (!slot) {
    throw new Error("Booking slot not found");
  }

  // Update slot
  const updatedSlot = await prisma.bookingSlot.update({
    where: { id },
    data: {
      serviceId, date, startsAt, endsAt, isAvailable, isBooked, note, bookingDeadline, maxBookings
    },
  });

  return updatedSlot;
};























export const techniciansService = {
    getAlltechniciansFromDB,
    getTechnicianByIdFromDB,
    updateAvailabilitySlotsinDB

}

