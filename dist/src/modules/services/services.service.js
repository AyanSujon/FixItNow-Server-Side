import { prisma } from "../../lib/prisma";
const createServiceInDB = async (payload, userid) => {
    const { categoryId, title, description, price, priceType, estimatedDuration, thumbnail, isAvailable } = payload;
    const technician = await prisma.technicianProfile.findUnique({
        where: {
            userId: userid,
        },
    });
    if (!technician) {
        throw new Error("Technician profile not found");
    }
    const technicianId = technician.id;
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    // Validate Existing Service with this title
    const existingService = await prisma.service.findFirst({
        where: {
            technicianId,
            categoryId,
            title: {
                equals: title,
                mode: "insensitive",
            },
        },
    });
    if (existingService) {
        throw new Error("You already have a service with this title in this category.");
    }
    const createdService = await prisma.service.create({
        data: {
            technicianId,
            categoryId: category.id,
            title,
            description,
            price,
            priceType,
            estimatedDuration,
            thumbnail,
            isAvailable,
        }
    });
    const service = await prisma.service.findUnique({
        where: {
            id: createdService.id,
        },
        include: {
            technician: true,
            reviews: true,
        }
    });
    return service;
};
// Filter by: 
// GET /api/services?categoryId=ed5696f7-a920-49cd-8afa-287f0aa78db8
// GET /api/services?city=Dhaka
// GET /api/services?district=Chattogram
// GET /api/services?address=Uttara
// GET /api/services?minRating=3
// GET /api/services?city=Dhaka&categoryId=ed5696f7-a920-49cd-8afa-287f0aa78db8&page=1&limit=10
const getAllServicesFromDB = async (filter) => {
    const { categoryId, minRating, address, city, district, page, limit, } = filter;
    const currentPage = Number(page) || 1;
    const perPage = Number(limit) || 10;
    const where = {
        ...(categoryId && { categoryId }),
        ...((address || city || district) && {
            technician: {
                ...(address && {
                    address: {
                        contains: address,
                        mode: "insensitive",
                    },
                }),
                ...(city && {
                    city: {
                        contains: city,
                        mode: "insensitive",
                    },
                }),
                ...(district && {
                    district: {
                        contains: district,
                        mode: "insensitive",
                    },
                }),
            },
        }),
        ...(minRating && {
            averageRating: {
                gte: Number(minRating),
            },
        }),
    };
    const services = await prisma.service.findMany({
        where,
        include: {
            category: true,
            technician: true,
        },
        skip: (currentPage - 1) * perPage,
        take: perPage,
    });
    const total = await prisma.service.count({ where });
    return {
        services,
        meta: {
            page: currentPage,
            limit: perPage,
            total,
            totalPage: Math.ceil(total / perPage),
        },
    };
};
export const servicesService = {
    createServiceInDB,
    getAllServicesFromDB
};
//# sourceMappingURL=services.service.js.map