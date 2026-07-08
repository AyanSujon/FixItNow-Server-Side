import { prisma } from "../../lib/prisma";
import { IService } from "./services.interface";


const createServiceInDB = async (payload: IService, userid: string) => {
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
    })


    const service = await prisma.service.findUnique({
        where: {
            id: createdService.id,
        },
        include: {
            technician: true,
            reviews: true,
        }
    })
    return service;

}


export const servicesService = {
    createServiceInDB,

}