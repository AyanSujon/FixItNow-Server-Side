import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { TechnicianFilters } from "./technicians.interface";



// const getAlltechniciansFromDB = async () => {
//     const technicians = await prisma.user.findMany({
//         where: {
//             role: "TECHNICIAN",
//             technicianProfile: {
//                 isApproved: true,
//             }
//         },
//         omit: {
//             password: true,
//         },
//         include: {
//             technicianProfile: true,
//         },
//         orderBy: {
//             createdAt: "desc"
//         }
//     });

//     return technicians;
// };







// Filter By:
// GET /api/technicians
// GET /api/technicians?city=Dhaka
// GET /api/technicians?profession=PLUMBER
// GET /api/technicians?city=Dhaka&profession=PLUMBER
// GET /api/technicians?isAvailable=true&isApproved=true
// GET /api/technicians?minRating=4&minExperience=5
// GET /api/technicians?city=Dhaka&profession=PLUMBER&isAvailable=true&page=1&limit=10


const getAlltechniciansFromDB = async (filters: TechnicianFilters) => {
  const technicians = await prisma.user.findMany({
    where: {
      role: Role.TECHNICIAN,
      technicianProfile: {
        ...(filters.city && { city: filters.city }),
        ...(filters.profession && { profession: filters.profession }),
        ...(filters.available !== undefined && {
          isAvailable: filters.available,
        }),
        ...(filters.approved !== undefined && {
          isApproved: filters.approved,
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
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
  });

  return technicians;
};

export const techniciansService = {
    getAlltechniciansFromDB,

}

