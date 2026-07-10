import { ICreatePayment } from "./payments.interface";
import { BookingStatus, CurrencyType, PaymentMethod, PaymentProvider, PaymentStatus } from "../../../generated/prisma/enums";
export declare const paymentService: {
    createPaymentsInDB: (customerId: string, payload: ICreatePayment) => Promise<{
        clientSecret: string | null;
        paymentIntentId: string;
        payment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            bookingId: string;
            customerId: string;
            status: PaymentStatus;
            amount: number;
            method: PaymentMethod;
            provider: PaymentProvider;
            stripeCustomerId: string | null;
            transactionId: string | null;
            paymentIntentId: string | null;
            sessionId: string | null;
            currency: CurrencyType;
            paidAt: Date | null;
            failureReason: string | null;
        };
    }>;
    createCheckoutSeassion: (userId: string, bookingId: string) => Promise<string | null>;
    handleWebhook: (payload: Buffer, signature: string) => Promise<void>;
    getAllPaymentHistoryFromDB: (userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        customerId: string;
        status: PaymentStatus;
        amount: number;
        method: PaymentMethod;
        provider: PaymentProvider;
        stripeCustomerId: string | null;
        transactionId: string | null;
        paymentIntentId: string | null;
        sessionId: string | null;
        currency: CurrencyType;
        paidAt: Date | null;
        failureReason: string | null;
    }[]>;
    getPaymentDetailsByIdFromDB: (paymentId: string) => Promise<({
        booking: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            note: string | null;
            serviceId: string;
            technicianId: string;
            customerId: string;
            paymentStatus: PaymentStatus;
            bookingDate: Date;
            cancelledAt: Date | null;
            cancelReason: string | null;
            acceptedAt: Date | null;
            completedAt: Date | null;
            status: BookingStatus;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        bookingId: string;
        customerId: string;
        status: PaymentStatus;
        amount: number;
        method: PaymentMethod;
        provider: PaymentProvider;
        stripeCustomerId: string | null;
        transactionId: string | null;
        paymentIntentId: string | null;
        sessionId: string | null;
        currency: CurrencyType;
        paidAt: Date | null;
        failureReason: string | null;
    }) | null>;
};
//# sourceMappingURL=payments.service.d.ts.map