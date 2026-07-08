

import { userStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { createServiceCategoryPlayload, UserFilters } from "./admin.interface";
import HttpStatus from "http-status";
import slugify from "slugify";


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








const updateUserStatus = async (id: string, userStatus: userStatus) => {

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error( "User not found");
  }

  // Update the user's status
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      userStatus,
    },
  });

  return updatedUser;
};






const createServiceCategoryInDB = async (payload: createServiceCategoryPlayload) => {
  const slug = slugify(payload.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [
        { name: payload.name },
        { slug },
      ],
    },
  });

  if (existingCategory) {
    throw new Error(
        "Category already exists."
    );
  }

  const category = await prisma.category.create({
    data: {
      name: payload.name,
      slug,
      icon: payload.icon,
      description: payload.description,
    },
  });

  return category;
};








const getAllCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
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





export const adminService = {
  getAllUserFromDB,
  updateUserStatus,
  createServiceCategoryInDB,
  getAllCategoriesFromDB,
  getAllBookingsFromDB, 
  
};