import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, request, Request, Response } from "express";
import config from "./config";
import { prisma } from "./lib/prisma";
import HttpStatus from "http-status";
import bcrypt from "bcryptjs";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";
import { techniciansRoutes } from "./modules/technicians/technicians.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { servicesRoutes } from "./modules/services/services.route";
import { bookingsRoutes } from "./modules/bookings/bookings.route";
import { paymentsRoutes } from "./modules/payments/payments.route";
import { stripe } from "./lib/stripe";
import { reviewsRoutes } from "./modules/reviews/reviews.route";
import { notFound } from "./middlewares/notfound";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";


const app: Application = express();

app.use(cors({
    origin: config.appUrl,
    credentials: true
}));


app.use("/api/payments/webhook", express.raw({ type: 'application/json' }))


// const endpointSecret = config.stripWebhookSecret;

// app.post("/api/payments/webhook", express.raw({type: 'application/json'}), (request, response)=>{
//      let event = request.body;

//      console.log(event,  " Stripe Request body")
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if (endpointSecret) {
//     // Get the signature sent by Stripe
//     const signature = request.headers['stripe-signature']!;
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature,
//         endpointSecret
//       );
//     } catch (err: any) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.status(400).json({
//         message: err.message
//       });
//     }
//   }

//   console.log(event, "event after try block");

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// })




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", async (req: Request, res: Response) => {
    res.send("Hello, World!");
});




// user Resister API 
app.use("/api/auth", userRoutes)


// Login API
app.use("/api/auth", authRoutes);


// Technicians (Public)
app.use("/api/technicians", techniciansRoutes);

// Technicians Private
app.use("/api/technician", techniciansRoutes);

// categories (Public)
app.use("/api/categories", categoriesRoutes);


// Admin ENDPOINT
app.use("/api/admin", adminRoutes);


app.use("/api/services", servicesRoutes);


app.use("/api/bookings", bookingsRoutes);



app.use("/api/payments", paymentsRoutes);


app.use("/api/reviews", reviewsRoutes);








app.use(notFound);



app.use(globalErrorHandler);







export default app;


