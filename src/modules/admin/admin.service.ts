

import { prisma } from "../../lib/prisma";
import { UserFilters } from "./admin.interface";

// Filter By:
// GET /api/admin/users?role=TECHNICIAN
// GET /api/admin/users?isVerified=true
// GET /api/admin/users?activeStatus=ACTIVE
// GET /api/admin/users?userStatus=BAN
// GET /api/admin/users?name=customer
// GET /api/admin/users?email=CUSTOMER4@example.com
// GET /api/admin/users?role=TECHNICIAN&isVerified=true&activeStatus=ACTIVE

// Pagination:
// GET /api/admin/users?page=4&limit=1

const getAllUserFromDB = async (filters: UserFilters) => {
  // Pagination
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 10;
  const skip = (page - 1) * limit;

  // Reusable where object
  const where = {
    ...(filters.name && {
      name: {
        contains: filters.name,
        mode: "insensitive" as const,
      },
    }),

    ...(filters.email && {
      email: {
        contains: filters.email,
        mode: "insensitive" as const,
      },
    }),

    ...(filters.role && {
      role: filters.role,
    }),

    ...(filters.activeStatus && {
      activeStatus: filters.activeStatus,
    }),

    ...(filters.isVerified !== undefined && {
      isVerified: filters.isVerified,
    }),

    ...(filters.userStatus && {
      userStatus: filters.userStatus,
    }),
  };

  // Total users matching filters
  const total = await prisma.user.count({
    where,
  });

  // Paginated users
  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
  });

  return {
    users,
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
  };
};

export const adminService = {
  getAllUserFromDB,
};