import { userStatus } from "../../../generated/prisma/enums";
import { createServiceCategoryPlayload, UserFilters } from "./admin.interface";
export declare const adminService: {
    getAllUserFromDB: (filters: UserFilters) => Promise<{
        users: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            password: string;
            activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
            role: import("../../../generated/prisma/enums").Role;
            isVerified: boolean;
            lastLoginAt: Date | null;
            userStatus: userStatus | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    updateUserStatus: (id: string, userStatus: userStatus) => Promise<{
        id: string;
        email: string;
        name: string;
        phone: string | null;
        password: string;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        role: import("../../../generated/prisma/enums").Role;
        isVerified: boolean;
        lastLoginAt: Date | null;
        userStatus: userStatus | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createServiceCategoryInDB: (payload: createServiceCategoryPlayload) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        isActive: boolean;
    }>;
    getAllCategoriesFromDB: () => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        icon: string | null;
        isActive: boolean;
    }[]>;
    getAllBookingsFromDB: () => Promise<({
        service: {
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
        };
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
        bookingSlots: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isAvailable: boolean;
            date: Date;
            startsAt: Date;
            endsAt: Date;
            isBooked: boolean;
            note: string | null;
            bookingDeadline: Date | null;
            maxBookings: number;
            bookedCount: number;
            serviceId: string;
            bookingId: string | null;
        }[];
        customer: {
            id: string;
            email: string;
            name: string;
            phone: string | null;
            password: string;
            activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
            role: import("../../../generated/prisma/enums").Role;
            isVerified: boolean;
            lastLoginAt: Date | null;
            userStatus: userStatus | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        note: string | null;
        serviceId: string;
        technicianId: string;
        customerId: string;
        paymentStatus: import("../../../generated/prisma/enums").PaymentStatus;
        bookingDate: Date;
        cancelledAt: Date | null;
        cancelReason: string | null;
        acceptedAt: Date | null;
        completedAt: Date | null;
        status: import("../../../generated/prisma/enums").BookingStatus;
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map