import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response} from "express";
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


const app: Application = express();

app.use(cors({
    origin: config.appUrl,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", async(req: Request, res: Response) => {
    res.send("Hello, World!");
});




// user Resister API 
app.use("/api/auth", userRoutes)


// Login API
app.use("/api/auth", authRoutes);


// Technicians (Public)
app.use("/api/technicians", techniciansRoutes);


// categories (Public)
app.use("/api/categories", categoriesRoutes);


// Admin ENDPOINT
app.use("/api/admin", adminRoutes);


app.use("/api/services", servicesRoutes);


app.use("/api/bookings", bookingsRoutes);



export default app;


