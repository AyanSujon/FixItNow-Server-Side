
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { ICreatePayment } from "./payments.interface";
import {
  BookingStatus,
  PaymentStatus,
} from "../../../generated/prisma/enums";
import config from "../../config";

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






// const confirmPaymentInDB = async (payload: {
//   paymentIntentId: string;
//   paymentId: string;
// }) => {
//   const { paymentIntentId, paymentId } = payload;

//   const paymentIntent = await stripe.paymentIntents.retrieve(
//     paymentIntentId
//   );

//   const payment = await prisma.payment.findUnique({
//     where: {
//       id: paymentId,
//     },
//   });

//   if (!payment) {
//     throw new Error("Payment not found.");
//   }

//   if (payment.paymentIntentId !== paymentIntentId) {
//     throw new Error("Invalid Payment Intent.");
//   }

//   if (paymentIntent.status === "succeeded") {
//     const updatedPayment = await prisma.$transaction(async (tx) => {
//       const payment = await tx.payment.update({
//         where: {
//           id: paymentId,
//         },
//         data: {
//           status: PaymentStatus.COMPLETED,
//           transactionId: paymentIntent.latest_charge as string,
//           paidAt: new Date(),
//         },
//       });

//       await tx.booking.update({
//         where: {
//           id: payment.bookingId,
//         },
//         data: {
//           status: BookingStatus.PAID,
//         },
//       });

//       return payment;
//     });

//     return updatedPayment;
//   }

//   if (paymentIntent.status === "processing") {
//     return await prisma.payment.update({
//       where: {
//         id: paymentId,
//       },
//       data: {
//         status: PaymentStatus.PROCESSING,
//       },
//     });
//   }

//   return await prisma.payment.update({
//     where: {
//       id: paymentId,
//     },
//     data: {
//       status: PaymentStatus.FAILED,
//       failureReason: paymentIntent.last_payment_error?.message ?? null,
//     },
//   });
// };







// const createCheckoutSeassion =async(userid: string) =>{
//     const transactionResult = await prisma.$transaction(async(tx)=>{

//         const user = await tx.user.findUniqueOrThrow({
//           where: {id: userid},
//           include: {
//             payments:true,
//           }
//         })

//         console.log(user, "payment service ")

//         // let stripeCustomerId = user.payments?.stripeCustomerId;
//         const stripeCustomerId = user.payments.stripeCustomerId;

//         if(!stripeCustomerId){

//           const customer = await stripe.customers.create({
//             email: user.email,
//             name: user.name,
//             metadata: {
//               userId: user.id, 
//             }
//           })

//           stripeCustomerId = customer.id
//         }

        
      
//     })

 
// }









const createCheckoutSeassion = async (userId: string) => {


  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        payments: true,
      },
    });

    // Find an existing Stripe customer ID from previous payments
    const existingPayment = user.payments.find(
      (payment) => payment.stripeCustomerId
    );

    let stripeCustomerId = existingPayment?.stripeCustomerId;

    // Create a Stripe customer if one doesn't exist
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });

      stripeCustomerId = customer.id;
    }

    // return {
    //   user,
    //   stripeCustomerId,
    // };





    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: config.stripePriceId,
        quantity: 1
      }],
      mode: "payment",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config.appUrl}/payment?success=true`,
      cancel_url: `${config.appUrl}/payment?success=false`,
      metadata: {userId: user.id}
      
    })

    return session.url;
  });

  return transactionResult;
};

















export const paymentService = {
  createPaymentsInDB,
  // confirmPaymentInDB,
  createCheckoutSeassion,


};