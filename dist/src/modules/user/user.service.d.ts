import { RegisterUserPayload } from "./user.interface";
export declare const userService: {
    registerUserIntoDB: (payload: RegisterUserPayload) => Promise<({
        technicianProfile: {
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
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        phone: string | null;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        role: import("../../../generated/prisma/enums").Role;
        isVerified: boolean;
        lastLoginAt: Date | null;
        userStatus: import("../../../generated/prisma/enums").userStatus | null;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    getMyProfileFromDB: (userId: string) => Promise<{
        technicianProfile: {
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
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        phone: string | null;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        role: import("../../../generated/prisma/enums").Role;
        isVerified: boolean;
        lastLoginAt: Date | null;
        userStatus: import("../../../generated/prisma/enums").userStatus | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMyProfileInDB: (userId: string, payload: any) => Promise<{
        technicianProfile: {
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
        } | null;
    } & {
        id: string;
        email: string;
        name: string;
        phone: string | null;
        activeStatus: import("../../../generated/prisma/enums").ActiveStatus;
        role: import("../../../generated/prisma/enums").Role;
        isVerified: boolean;
        lastLoginAt: Date | null;
        userStatus: import("../../../generated/prisma/enums").userStatus | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map