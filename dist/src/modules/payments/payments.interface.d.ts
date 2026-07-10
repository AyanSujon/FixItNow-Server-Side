import { CurrencyType, PaymentMethod, PaymentProvider } from "../../../generated/prisma/enums";
export interface ICreatePayment {
    bookingId: string;
    amount: number;
    method: PaymentMethod;
    provider: PaymentProvider;
    currency?: CurrencyType;
}
//# sourceMappingURL=payments.interface.d.ts.map