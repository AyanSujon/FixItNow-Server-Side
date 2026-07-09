
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { ICreatePayment } from "./payments.interface";
import {
  BookingStatus,
  PaymentStatus,
} from "../../../generated/prisma/enums";

const createPaymentsInDB = async (
  customerId: string,
  payload: ICreatePayment
) => {
  const {
    bookingId,
    amount,
    method,
    provider,
    currency = "USD",
  } = payload;

  // Check booking
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found.");
  }

  // Booking must be accepted
  if (booking.status !== BookingStatus.ACCEPTED) {
    throw new Error("Payment can only be made for accepted bookings.");
  }

  // Prevent duplicate successful payment
  const existingPayment = await prisma.payment.findFirst({
    where: {
      bookingId,
    },
  });

  if (
    existingPayment &&
    existingPayment.status === PaymentStatus.COMPLETED
  ) {
    throw new Error("This booking has already been paid.");
  }

  // Create Stripe Payment Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe expects the smallest currency unit
    currency: currency.toLowerCase(),
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      bookingId,
      customerId,
    },
  });

  // Save payment
  const payment = await prisma.payment.create({
    data: {
      bookingId,
      customerId,
      amount,
      method,
      provider,
      currency,
      paymentIntentId: paymentIntent.id,
      status: PaymentStatus.PENDING,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    payment,
  };
};

export const paymentService = {
  createPaymentsInDB,
};