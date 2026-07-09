



// {
//   "bookingId": "7d9c3e41-8b53-49d4-b5e4-3b1c0c5d9f12",
//   "amount": 150,
//   "method": "CARD",
//   "provider": "STRIPE",
//   "currency": "USD"
// }

import { CurrencyType, PaymentMethod, PaymentProvider } from "../../../generated/prisma/enums";



// {
//   "bookingId": "7d9c3e41-8b53-49d4-b5e4-3b1c0c5d9f12",
//   "customerId": "2c6f18b1-4d8b-4d8d-a9fd-91c3f9d77d8b",
//   "amount": 150,
//   "method": "CARD",
//   "provider": "STRIPE",
//   "status": "PENDING",
//   "transactionId": null,
//   "paymentIntentId": null,
//   "sessionId": null,
//   "currency": "USD",
//   "paidAt": null,
//   "failureReason": null
// }

export interface ICreatePayment {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
  provider: PaymentProvider;
  currency?: CurrencyType;
}