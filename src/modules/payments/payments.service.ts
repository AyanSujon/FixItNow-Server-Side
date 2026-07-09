
import { prisma } from "../../lib/prisma";
import { stripe } from "../../lib/stripe";
import { ICreatePayment } from "./payments.interface";
import {
  BookingStatus,
  CurrencyType,
  PaymentMethod,
  PaymentProvider,
  PaymentStatus,
} from "../../../generated/prisma/enums";
import config from "../../config";
import Stripe from "stripe";

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









const createCheckoutSeassion = async (userId: string, bookingId: string) => {


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
          bookingId: bookingId
        },
      });

      stripeCustomerId = customer.id;
    }



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
      metadata: { 
        userId: user.id,
        bookingId: bookingId

      }

    })

    return session.url;
  });

  return transactionResult;
};









// const handleWebhook = async (payload: Buffer, signature: string) => {

//   const endpointSecret = config.stripWebhookSecret;
//   const event = stripe.webhooks.constructEvent(
//     payload,
//     signature,
//     endpointSecret
//   );



//   // Handle the event
//   switch (event.type) {
//     case 'checkout.session.completed':
//       console.log(event.data.object);

//       const seassion: Stripe.Checkout.Session = event.data.object;

//       const userId = seassion.metadata?.userid as string;
//       const stripeCustomerId = seassion.customer as string;
//       // const subscriptionId = seassion.subscription; 
//       const amount = seassion?.amount_total! / 100;
//       const currency = seassion.currency?.toUpperCase() as CurrencyType;

//       if (!userId || !stripeCustomerId) {
//         throw new Error("webhook failed")
//       }


//       await prisma.payment.upsert({
//         where: {
//           customerId: userId
//         },
//         create: {
//           customerId: userId,
//           stripeCustomerId,
//           status: "COMPLETED" as PaymentStatus,
//           amount: amount,
//           currency: currency,




//       }
    
//     )






//       break;
//     case 'customer.subscription.updated':

//       break;

//     case 'customer.subscription.deleted':

//       break;

//     default:
//       // Unexpected event type
//       console.log(`No event matched. Unhandled event type ${event.type}.`);
//       break;
//   }
// }

















const handleWebhook = async (payload: Buffer, signature: string) => {
  const endpointSecret = config.stripWebhookSecret;

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId as string;
      const bookingId = session.metadata?.bookingId as string;

      const stripeCustomerId = session.customer as string;

      const amount = (session.amount_total ?? 0) / 100;

      const currency = session.currency?.toUpperCase() as CurrencyType;

      if (!userId|| !stripeCustomerId) {
        throw new Error("Webhook validation failed.");
      }

      await prisma.payment.upsert({
        where: {
          bookingId,
          customerId: userId,
        },
        create: {
          bookingId,
          customerId: userId,
          stripeCustomerId,
          amount,
          currency,
          method: PaymentMethod.CARD,
          provider: PaymentProvider.STRIPE,
          status: PaymentStatus.COMPLETED,
          paymentIntentId: session.payment_intent as string,
          sessionId: session.id,
          paidAt: new Date(),
        },
        update: {
          stripeCustomerId,
          amount,
          currency,
          status: PaymentStatus.COMPLETED,
          paymentIntentId: session.payment_intent as string,
          sessionId: session.id,
          paidAt: new Date(),
        },
      });

      break;
    }

    case "customer.subscription.updated":
      break;

    case "customer.subscription.deleted":
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }
};












const getAllPaymentHistoryFromDB = async (userId: string) => {
  const allPaymentHistory = await prisma.payment.findMany({
    where: {
      customerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return allPaymentHistory;
};








const getPaymentDetailsByIdFromDB =async (paymentId: string) => {
  const allPaymentHistory = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include:{
      booking: true
    }
  });

  return allPaymentHistory;
};













export const paymentService = {
  createPaymentsInDB,
  // confirmPaymentInDB,
  createCheckoutSeassion,
  handleWebhook,
  getAllPaymentHistoryFromDB,
  getPaymentDetailsByIdFromDB









};