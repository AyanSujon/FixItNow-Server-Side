import { ICreateReview } from "./reviews.interface";
export declare const reviewsService: {
    createReviewInDB: (customerId: string, payload: ICreateReview) => Promise<{
        customer: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serviceId: string | null;
        bookingId: string;
        technicianId: string;
        customerId: string;
        rating: number;
        comment: string | null;
    }>;
};
//# sourceMappingURL=reviews.service.d.ts.map