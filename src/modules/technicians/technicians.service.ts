import { Role } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { TechnicianFilters } from "./technicians.interface";



// const getAlltechniciansFromDB = async () => {
//     const technicians = await prisma.user.findMany({
//         where: {
//             role: Role.TECHNICIAN,
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
// GET /api/technicians?minRating=3&minExperience=1
// GET /api/technicians?city=Dhaka&profession=PLUMBER&isAvailable=true&page=1&limit=10
// Pagination 
// GET /api/technicians?page=4&limit=1 


const getAlltechniciansFromDB = async (filters: TechnicianFilters) => {
  // Pagination 
  const page = Number(filters.page) || 1; 
  const limit = Number(filters.limit) || 10; 
  const skip = (page - 1) * limit;



  const technicians = await prisma.user.findMany({
    where: {
      role: Role.TECHNICIAN,
      technicianProfile: {
        ...(filters.city && {
          city: {
            equals: filters.city,
            mode: "insensitive",
          },
        }),

        ...(filters.profession && {
          profession: {
            equals: filters.profession
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
    },
    omit: {
      password: true,
    },
    include: {
      technicianProfile: true,
    },
    skip: skip,
    take: limit,

  });


  return {technicians, meta: {
    page,
    limit,
    total: technicians.length,
    totalPage: Math.ceil(technicians.length / limit),
  }
    }
};














export const techniciansService = {
    getAlltechniciansFromDB,

}

