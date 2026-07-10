import { IService, IServiceQuery } from "./services.interface";
export declare const servicesService: {
    createServiceInDB: (payload: IService, userid: string) => Promise<({
        reviews: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            serviceId: string | null;
            bookingId: string;
            technicianId: string;
            customerId: string;
            rating: number;
            comment: string | null;
        }[];
        technician: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profilePhoto: string | null;
            bio: string | null;
            description: string | null;
            profession: import("../../../generated/prisma/enums").Profession | null;
            skills: import("../../../generated/prisma/enums").SkillsType | null;
            yearsOfExperience: number | null;
            hourlyRate: import("@prisma/client-runtime-utils").Decimal | null;
            averageRating: number;
            totalReviews: number;
            totalCompletedJobs: number;
            isAvailable: boolean;
            responseTime: number | null;
            isApproved: boolean;
            address: string | null;
            city: string | null;
            district: string | null;
            userId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        averageRating: number;
        totalReviews: number;
        isAvailable: boolean;
        technicianId: string;
        categoryId: string;
        title: string;
        price: import("@prisma/client-runtime-utils").Decimal;
        priceType: import("../../../generated/prisma/enums").PriceType;
        estimatedDuration: number | null;
        thumbnail: string | null;
    }) | null>;
    getAllServicesFromDB: (filter: IServiceQuery) => Promise<{
        services: ({
            technician: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                profilePhoto: string | null;
                bio: string | null;
                description: string | null;
                profession: import("../../../generated/prisma/enums").Profession | null;
                skills: import("../../../generated/prisma/enums").SkillsType | null;
                yearsOfExperience: number | null;
                hourlyRate: import("@prisma/client-runtime-utils").Decimal | null;
                averageRating: number;
                totalReviews: number;
                totalCompletedJobs: number;
                isAvailable: boolean;
                responseTime: number | null;
                isApproved: boolean;
                address: string | null;
                city: string | null;
                district: string | null;
                userId: string;
            };
            category: {
                id: string;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                slug: string;
                icon: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            averageRating: number;
            totalReviews: number;
            isAvailable: boolean;
            technicianId: string;
            categoryId: string;
            title: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            priceType: import("../../../generated/prisma/enums").PriceType;
            estimatedDuration: number | null;
            thumbnail: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
};
//# sourceMappingURL=services.service.d.ts.map