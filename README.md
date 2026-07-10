
# FixItNow 🔧

A professional, production-ready backend API for an on-demand home service platform. FixItNow connects customers with skilled technicians (plumbers, electricians, carpenters, etc.) to resolve household maintenance needs efficiently.

[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Stripe](https://img.shields.io/badge/Payment-Stripe-008CFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Postgres](https://img.shields.io/badge/Database-PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

# Table of Contents

- [Project Overview](#project-overview)
- [Live API & Developer Resources](#live-api--developer-resources)
- [Features](#features)
  - [Public Features](#public-features)
  - [Customer Features](#customer-features)
  - [Technician Features](#technician-features)
  - [Admin Features](#admin-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
  - [Directory Tree](#directory-tree)
  - [Folder Responsibility](#folder-responsibility)
- [Database Design](#database-design)
  - [Entity-Relationship Summary](#entity-relationship-summary)
  - [Detailed Models](#detailed-models)
- [Authentication & Authorization](#authentication--authorization)
  - [Authentication Flow](#authentication-flow)
  - [Protected Routes & Role Middleware](#protected-routes--role-middleware)
- [User Roles & Permissions](#user-roles--permissions)
- [System Workflows & Flows](#system-workflows--flows)
  - [Customer & Booking Journey](#customer--booking-journey)
  - [Technician Availability & Booking Status Lifecycle](#technician-availability--booking-status-lifecycle)
  - [Stripe Payment Lifecycle](#stripe-payment-lifecycle)
- [API Response Format](#api-response-format)
  - [Standard Success Response](#standard-success-response)
  - [Standard Error Response](#standard-error-response)
- [API Documentation](#api-documentation)
  - [Authentication APIs](#authentication-apis)
  - [User APIs](#user-apis)
  - [Category APIs](#category-apis)
  - [Service APIs](#service-apis)
  - [Technician APIs](#technician-apis)
  - [Booking APIs](#booking-apis)
  - [Payment APIs](#payment-apis)
  - [Review APIs](#review-apis)
  - [Admin APIs](#admin-apis)
- [Query Parameters, Filtering, Searching, & Sorting](#query-parameters-filtering-searching--sorting)
  - [Query Parameters](#query-parameters)
  - [Filtering & Searching logic](#filtering--searching-logic)
  - [Sorting](#sorting)
  - [Pagination](#pagination)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [Environment Variables](#environment-variables)
- [Installation & Running Locally](#installation--running-locally)
- [Build & Scripts](#build-&amp;-scripts)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)

---

# Project Overview

**FixItNow** is a modern on-demand home service marketplace designed to solve the real-world challenge of finding reliable service professionals. Household issues like plumbing failures, electrical hazards, and carpentry requests require timely expertise. Traditionally, customers struggle with opaque pricing, lack of technician reviews, and uncoordinated scheduling. 

FixItNow addresses this business problem by:
- Creating a unified directory of verified technicians organized by profession.
- Facilitating dynamic slot-based bookings.
- Integrating secure digital payments via Stripe.
- Providing transparent reviews and ratings to build marketplace trust.

---

# Live API & Developer Resources

> [!NOTE]  
> Below are the official URLs mapped from the project repository configs:
- **DrawSQL ERD Design**: [DrawSQL - FixItNow ERD](https://drawsql.app/teams/ayansujon/diagrams/fixitnow-erd)
- **FixItNow live link**: [Live API Link](https://fixitnow-v1.vercel.app/)
- **Postman API Collection**: [Postman Collection Workspace](https://github.com/AyanSujon/FixItNow-Server-Side/blob/main/FixItNow.postman_collection%20(1).json)

---

# Features

## Public Features
* **Explore Categories:** Browse categories (e.g., Electrical, Plumbing, Cleaning) to find services.
* **Technician Directory:** View profiles, profession classifications, availability flags, ratings, and experience details of registered technicians.
* **Filtered Services:** Query list of services by category, rating, location parameters (city, district, address).

## Customer Features
* **Register/Login & Profile Management:** Customers can securely sign up, retrieve their profile details, and update contact and location details.
* **Dynamic Booking:** Create a booking for a specific technician and service by selecting active availability slots.
* **Secured Payments:** Create Stripe payment sessions or check out via credit card, tracking payment statuses.
* **Booking History:** Fetch user-specific payment history and booking details.
* **Feedback System:** Submit a review and numeric rating (1-5) for a completed service booking.

## Technician Features
* **Profile Customization:** Personalize technician profiles (bio, profession, hourly rates, experience, cities/districts).
* **Slots Creation & Updates:** Add new availability slots with specific start/end timestamps and set customized slot availability limits.
* **Booking Operations:** View assigned bookings from customers and patch booking statuses (e.g. accepted, declined, completed).

## Admin Features
* **Marketplace Administration:** View list of all system users and search by name/email or filter by roles/status.
* **User Controls:** Temporarily ban or unban users.
* **Category Configuration:** Add new service categories with icon identifiers and descriptive bios.
* **Global Overviews:** Fetch all bookings globally registered in the database.

---

# Technology Stack

* **Core Language:** TypeScript (v6.0.3)
* **Backend Runtime / Framework:** Node.js, Express (v5.2.1)
* **Database engine:** PostgreSQL
* **ORM:** Prisma Client & Prisma Generator (v7.8.0)
* **Database Driver / Connection Adapter:** `@prisma/adapter-pg` (v7.8.0) & `pg` (v8.22.0)
* **Security & Authentication:** `jsonwebtoken` (v9.0.3) for JWT operations, `bcryptjs` (v3.0.3) and `bcrypt` (v6.0.0) for password hashing.
* **Cookie Parsing:** `cookie-parser` (v1.4.7)
* **Payments:** `stripe` (v22.3.0) for checkout sessions and secure webhooks.
* **Utilities:** `slugify` (v1.6.9) for auto-generating unique URL-friendly category slugs, `http-status` (v2.1.0) for standardized HTTP response codes.
* **Development & Build Tools:** `tsx` (v4.22.4) for rapid execution/watch mode, `typescript` compilation, standard CORS middleware.

---

# Architecture

## Directory Tree

```text
src/
├── app.ts                 # Express application initialization and middleware registration
├── server.ts              # Database connection and HTTP server listener
├── config/
│   └── index.ts           # Centralized environment variable loader and config manager
├── lib/
│   ├── prisma.ts          # Configures PrismaClient using the PG adapter
│   └── stripe.ts          # Instantiates the Stripe client SDK instance
├── middlewares/
│   ├── auth.ts            # JWT authentication parser and role validation guard
│   ├── globalErrorHandler.ts # Express-wide centralized error formatting logic
│   └── notFound.ts        # Fallback middleware responding to unmatched paths
├── utils/
│   ├── catchAsync.ts      # Wraps async middleware to capture runtime errors
│   ├── jwt.ts             # Helper functions to sign and verify JWT tokens
│   └── sendResponse.ts    # Standardizes JSON response structures
└── modules/
    ├── admin/             # User lists, user blocking, booking controls, category config
    ├── auth/              # Handles credential login and token refreshing
    ├── bookings/          # Creates slot bookings and fetches customer order logs
    ├── categories/        # Retrieves public category configurations
    ├── payments/          # Coordinates Stripe intents, checkout sessions, and webhook alerts
    ├── reviews/           # Post-completion rating and comment submissions
    ├── services/          # Handles technician service items mapping
    ├── technicians/       # Technician profiles, availability calendars, status updates
    └── user/              # User registrations and individual profile mutations
```

## Folder Responsibility
* **Config:** Resolves physical `.env` files into a type-safe configuration object.
* **Lib:** Houses external service bindings (Prisma PG Adapter setup and Stripe setup).
* **Middlewares:** Secures endpoints via token validations, handles fallback routes, and maps exceptions to standard HTTP error models.
* **Utils:** Pure helper modules containing boilerplate-reducing functions like async catch wraps and standard response schemas.
* **Modules:** Organizes related routes, controllers, interfaces, and database service queries by sub-domain.

---

# Database Design

## Entity-Relationship Summary

The database uses PostgreSQL, managed via Prisma. The relationships are structured as follows:
- **User (1:1) TechnicianProfile:** Only users with `role: "TECHNICIAN"` possess a corresponding profile.
- **Category (1:N) Service:** Services belong to specific category nodes.
- **TechnicianProfile (1:N) Service:** A technician hosts multiple custom services.
- **Service (1:N) BookingSlot:** Booking slots represent a specific date and time block created for a service.
- **Booking (1:N) BookingSlot:** Multiple availability slots can be consolidated under one customer booking.
- **User (1:N) Booking:** Customers place multiple bookings (`relation: "CustomerBookings"`).
- **TechnicianProfile (1:N) Booking:** Bookings target a specific technician profile.
- **Service (1:N) Booking:** Each booking links back to the selected service.
- **Booking (1:1) Payment:** A booking has an optional associated payment transaction.
- **User (1:N) Payment:** Customer relation mapping all payments made by a client.
- **Booking (1:1) Review:** Once a booking is completed, a customer can submit one review.

```mermaid
erDiagram
    users ||--o| technician_profiles : "1:1 profile"
    users ||--o| bookings : "1:N CustomerBookings"
    users ||--o| payments : "1:N CustomerPayments"
    users ||--o| reviews : "1:N CustomerReviews"
    
    categories ||--o| services : "1:N Category"
    
    technician_profiles ||--o| services : "1:N TechnicianServices"
    technician_profiles ||--o| bookings : "1:N TechnicianBookings"
    technician_profiles ||--o| reviews : "1:N TechnicianReviews"
    
    services ||--o| booking_slot : "1:N slots"
    services ||--o| bookings : "1:N ServiceBookings"
    services ||--o| reviews : "1:N ServiceReviews"
    
    bookings ||--o| booking_slot : "1:N SelectedSlots"
    bookings ||--o| payments : "1:1 BookingPayment"
    bookings ||--o| reviews : "1:1 BookingReview"
```

## Detailed Models

### User
* **Purpose:** Represents the core identity schema for all customers, technicians, and administrators.
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `name` (String, VarChar(255))
  - `email` (String, Unique)
  - `phone` (String, Optional)
  - `password` (String, Hashed)
  - `activeStatus` (Enum: `ActiveStatus`, default `ACTIVE`)
  - `role` (Enum: `Role`, default `CUSTOMER`)
  - `isVerified` (Boolean, default `false`)
  - `lastLoginAt` (DateTime, Optional)
  - `userStatus` (Enum: `userStatus`, Optional - BAN/UNBAN)
  - `createdAt` & `updatedAt` (DateTime)
* **Mapped Table Name:** `users`

### Category
* **Purpose:** Defines the service domains (e.g., Electrical, Plumbing, Cleaning).
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `name` (String, Unique)
  - `slug` (String, Unique, Slugified version of name)
  - `icon` (String, Optional)
  - `description` (String, Optional)
  - `isActive` (Boolean, default `true`)
  - `createdAt` & `updatedAt` (DateTime)
* **Mapped Table Name:** `categories`

### Service
* **Purpose:** Outlines a specific task offered by a technician.
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `technicianId` (String, Foreign Key mapping to `TechnicianProfile.id`, Cascade Delete)
  - `categoryId` (String, Foreign Key mapping to `Category.id`, Restrict Delete)
  - `title` (String)
  - `description` (String)
  - `price` (Decimal, 10,2)
  - `priceType` (Enum: `PriceType`, default `FIXED`)
  - `estimatedDuration` (Int, duration in minutes, Optional)
  - `thumbnail` (String, Optional)
  - `isAvailable` (Boolean, default `true`)
  - `averageRating` (Float, default `0`)
  - `totalReviews` (Int, default `0`)
  - `createdAt` & `updatedAt` (DateTime)
* **Indexes:** `[technicianId]`, `[categoryId]`
* **Mapped Table Name:** `services`

### TechnicianProfile
* **Purpose:** Extends the User model with specific professional credentials and rating stats.
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `userId` (String, Unique Foreign Key mapping to `User.id`)
  - `bio` (String, Optional)
  - `profilePhoto` (String, Optional)
  - `description` (String, Optional)
  - `profession` (Enum: `Profession`, Optional)
  - `skills` (Enum: `SkillsType`, Optional)
  - `yearsOfExperience` (Int, Optional)
  - `hourlyRate` (Decimal, 10,2, Optional)
  - `averageRating` (Float, default `0`)
  - `totalReviews` (Int, default `0`)
  - `totalCompletedJobs` (Int, default `0`)
  - `isAvailable` (Boolean, default `true`)
  - `responseTime` (Int, Optional)
  - `isApproved` (Boolean, default `false`)
  - `address` (String, Optional)
  - `city` (String, Optional)
  - `district` (String, Optional)
  - `createdAt` & `updatedAt` (DateTime)
* **Mapped Table Name:** `technician_profiles`

### BookingSlot
* **Purpose:** Represents specific availability blocks allocated by a technician for a service.
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `serviceId` (String, Foreign Key mapping to `Service.id`, Cascade Delete)
  - `date` (DateTime, representing the slot date)
  - `startsAt` (DateTime, start time)
  - `endsAt` (DateTime, end time)
  - `isAvailable` (Boolean, default `true`)
  - `isBooked` (Boolean, default `false`)
  - `bookingId` (String, Optional Foreign Key mapping to `Booking.id`)
  - `note` (String, Optional)
  - `bookingDeadline` (DateTime, Optional)
  - `maxBookings` (Int, default `1`)
  - `bookedCount` (Int, default `0`)
  - `createdAt` & `updatedAt` (DateTime)
* **Indexes:** `[serviceId]`, `[date]`
* **Mapped Table Name:** `booking_slot`

### Booking
* **Purpose:** Tracks scheduling agreements made between customers and technicians.
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `customerId` (String, Foreign Key mapping to `User.id`)
  - `technicianId` (String, Foreign Key mapping to `TechnicianProfile.id`)
  - `serviceId` (String, Foreign Key mapping to `Service.id`)
  - `note` (String, Optional)
  - `paymentStatus` (Enum: `PaymentStatus`, default `PENDING`)
  - `status` (Enum: `BookingStatus`, default `REQUESTED`)
  - `bookingDate` (DateTime, default `now()`)
  - `cancelledAt` (DateTime, Optional)
  - `cancelReason` (String, Optional)
  - `acceptedAt` (DateTime, Optional)
  - `completedAt` (DateTime, Optional)
  - `createdAt` & `updatedAt` (DateTime)
* **Mapped Table Name:** `bookings`

### Payment
* **Purpose:** Logs transactions processed through financial integrations (Stripe).
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `bookingId` (String, Unique Foreign Key mapping to `Booking.id`, Cascade Delete)
  - `customerId` (String, Foreign Key mapping to `User.id`)
  - `amount` (Float)
  - `method` (Enum: `PaymentMethod`)
  - `provider` (Enum: `PaymentProvider`)
  - `status` (Enum: `PaymentStatus`, default `PENDING`)
  - `stripeCustomerId` (String, Optional)
  - `transactionId` (String, Unique, Optional)
  - `paymentIntentId` (String, Unique, Optional)
  - `sessionId` (String, Unique, Optional)
  - `currency` (Enum: `CurrencyType`, default `USD`)
  - `paidAt` (DateTime, Optional)
  - `failureReason` (String, Optional)
  - `createdAt` & `updatedAt` (DateTime)
* **Indexes:** `[customerId]`, `[bookingId]`, `[status]`

### Review
* **Purpose:** Stores customer feedback for service bookings.
* **Fields:**
  - `id` (String, UUID, Primary Key)
  - `customerId` (String, Foreign Key mapping to `User.id`)
  - `technicianId` (String, Foreign Key mapping to `TechnicianProfile.id`)
  - `bookingId` (String, Unique Foreign Key mapping to `Booking.id`)
  - `serviceId` (String, Foreign Key mapping to `Service.id`, Optional)
  - `rating` (Int)
  - `comment` (String, Optional)
  - `createdAt` & `updatedAt` (DateTime)

---

# Authentication & Authorization

## Authentication Flow
FixItNow uses **JSON Web Tokens (JWT)** for securing APIs.
1. **Credentials verification:** Customer or technician posts to `/api/auth/login`.
2. **Cookie Issuance:** Upon successful verification, the backend issues an `accessToken` (validated against `JWT_ACCESS_SECRET`) and a `refreshToken` (validated against `JWT_REFRESH_SECRET`) which are appended directly into secure, HTTP-only cookies.
3. **Token Headers fallback:** The authorization middleware also scans headers for a `Bearer <token>` payload or direct `Authorization` key values.
4. **Token Refreshing:** Clients send requests to `/api/auth/refresh-token` with the HTTP cookie to rotate the `accessToken` without prompting credential re-entry.

```mermaid
sequenceDiagram
    participant Client
    participant API as Auth Middleware
    participant Database as PostgreSQL
    
    Client->>API: POST /api/auth/login (credentials)
    API->>Database: Query User Email
    Database-->>API: User details + Hashed Password
    API->>API: Compare bcrypt hashes
    API->>Client: Returns JWT Cookies (accessToken, refreshToken)
    
    Note over Client, API: Subsequents requests
    Client->>API: GET /api/auth/me (Cookie or Bearer Header)
    API->>API: Verify Signature against JWT_ACCESS_SECRET
    API->>Database: Validate User exists & is active
    Database-->>API: User profile
    API-->>Client: Returns payload data
```

## Protected Routes & Role Middleware
Protected routes invoke the `auth(...roles)` higher-order middleware.
* Checks token presence.
* Decodes credentials signature.
* Compares user role against authorized role lists.
* Verifies status constraints (`activeStatus` must not be `BLOCKED`).

---

# User Roles & Permissions

| Endpoint / Modules | Allowed Roles | Anonymous (Public) | Description |
|---|---|---|---|
| `POST /api/auth/register` | All | Yes | Creates a user. Instantiates technician profile if role matches. |
| `POST /api/auth/login` | All | Yes | Authenticates user credentials, sets cookies. |
| `POST /api/auth/refresh-token` | All | Yes | Exchanges refresh token for a new access token. |
| `GET /api/auth/me` | ADMIN, TECHNICIAN, CUSTOMER | No | Retrieves current logged-in user profile. |
| `PUT /api/auth/my-profile` | ADMIN, TECHNICIAN, CUSTOMER | No | Updates user details. |
| `GET /api/categories` | All | Yes | Retrieves all categories. |
| `GET /api/services` | All | Yes | Retrieves paginated services. |
| `POST /api/services/create` | TECHNICIAN | No | Adds service listing mapped to category. |
| `GET /api/technicians` | All | Yes | Lists technicians with search/filter. |
| `GET /api/technicians/:id` | All | Yes | Fetches technician profile by User ID. |
| `POST /api/technician/availability`| TECHNICIAN | No | Creates service slots. |
| `PUT /api/technician/availability/:id`| TECHNICIAN | No | Updates specific booking slot fields. |
| `PUT /api/technician/profile` | TECHNICIAN | No | Modifies technician resume details. |
| `GET /api/technician/bookings` | TECHNICIAN | No | View bookings assigned to technician. |
| `PATCH /api/technician/bookings/:id`| TECHNICIAN | No | Approves, cancels, or completes booking. |
| `POST /api/bookings/create` | CUSTOMER | No | Submits booking transaction, locks slots. |
| `GET /api/bookings` | CUSTOMER | No | Retrieves booking log entries globally. |
| `GET /api/bookings/:id` | CUSTOMER | No | Fetches details of a specific booking. |
| `POST /api/payments/create` | CUSTOMER | No | Starts Stripe PaymentIntent. |
| `POST /api/payments/checkout` | CUSTOMER | No | Redirects customer to Stripe checkout link. |
| `GET /api/payments` | CUSTOMER | No | Fetch customer history payments. |
| `GET /api/payments/:id` | CUSTOMER | No | Retrieve individual payment invoice. |
| `POST /api/reviews` | CUSTOMER | No | Rate completed bookings. |
| `GET /api/admin/users` | ADMIN | No | Fetch user directories. |
| `PATCH /api/admin/users/:id` | ADMIN | No | Ban or unban profiles. |
| `POST /api/admin/categories` | ADMIN | No | Inject category definitions. |
| `GET /api/admin/categories` | ADMIN | No | Fetch category list for admin view. |
| `GET /api/admin/bookings` | ADMIN | No | Global booking dashboard access. |

---

# System Workflows & Flows

## Customer & Booking Journey
1. Customer registers or logs in, and explores services.
2. Selects a category & service, noting available booking slots.
3. Customer submits a booking request specifying slot IDs. Slots are immediately reserved and marked `isBooked: true`.

```mermaid
graph TD;
    A[Customer Registers / Logs In] --> B[Browse Services / Categories];
    B --> C[Select Service & Free Slots];
    C --> D[POST /api/bookings/create];
    D --> E{Slots available?};
    E -- No --x F[Error response];
    E -- Yes --> G[Transaction: Booking Status REQUESTED, Slots marked Booked];
    G --> H[Technician review booking];
```

## Technician Availability & Booking Status Lifecycle
1. Technician logs in and configures slot calendars via `POST /api/technician/availability`.
2. Upon receiving booking alerts (`status: REQUESTED`), technician reviews client notes.
3. Technician updates status (`ACCEPTED` or `DECLINED`).
4. Once completed, technician sets state to `COMPLETED`.

```mermaid
stateDiagram-v2
    [*] --> REQUESTED : Customer books slots
    REQUESTED --> DECLINED : Technician rejects request
    REQUESTED --> ACCEPTED : Technician approves request
    ACCEPTED --> CANCELLED : Customer/Technician cancels booking
    ACCEPTED --> PAID : Customer processes payment
    PAID --> IN_PROGRESS : Technician starts job
    IN_PROGRESS --> COMPLETED : Job finishes successfully
```

## Stripe Payment Lifecycle
Customers can pay for bookings with `status: ACCEPTED`.
1. **Intent Method:** Client invokes `/api/payments/create` -> API creates Stripe PaymentIntent -> Returns `clientSecret` -> Client UI presents card form -> Success.
2. **Checkout Session:** Customer hits `/api/payments/checkout` -> Redirects client to Stripe Session page -> Completes payment -> Stripe redirects back.
3. **Webhook Syncer:** Stripe issues `checkout.session.completed` hook to `/api/payments/webhook` -> Server marks Payment status as `COMPLETED` and Booking as `PAID`.

```mermaid
sequenceDiagram
    participant User
    participant Server
    participant Stripe
    
    User->>Server: POST /api/payments/checkout (bookingId)
    Server->>Stripe: Create checkout session
    Stripe-->>Server: Return session URL
    Server-->>User: Send URL link to redirect
    User->>Stripe: Completes checkout via Card
    Stripe->>Server: Webhook: checkout.session.completed
    Server->>Server: Database Transaction: Mark Payment COMPLETED & Booking PAID
```

---

# API Response Format

The server communicates using standardized JSON responses for success and error conditions.

## Standard Success Response
All endpoints returning `200 OK` or `210 Created` wrap data payloads inside a uniform JSON block:
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Resource fetched successfully.",
  "data": {
    "profile": {
      "id": "11a58cf5-33fc-42c9-a878-91e3c4ddf5b9",
      "name": "Ayan Sujon",
      "email": "customer@example.com",
      "role": "CUSTOMER"
    }
  },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPage": 1
  }
}
```

## Standard Error Response
If a process breaks, the global error middleware catches it and formats the output:
```json
{
  "success": false,
  "statusCode": 400,
  "name": "PrismaClientKnownRequestError",
  "message": "Buplicate Key Error",
  "error": "Error: Unique constraint failed on the fields: (email)\n    at User.create..."
}
```
> [!WARNING]  
> Notice that the actual HTTP status code returned by the Express server on middleware failure is **always `500 Internal Server Error`** due to `res.status(HttpStatus.INTERNAL_SERVER_ERROR)` hardcoding in `globalErrorHandler.ts`, while the response JSON contains the dynamically resolved status.

---

# API Documentation

## Authentication APIs

### Register User
* **Method:** `POST`
* **Endpoint:** `/api/auth/register`
* **Auth Required:** No
* **Request Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "strongpassword123",
    "phone": "+8801700000000",
    "role": "CUSTOMER",
    "profilePhoto": "https://example.com/photo.jpg"
  }
  ```
* **Validation Rules:**
  - `name`: Required
  - `email`: Required, unique format
  - `password`: Required (hashed using bcrypt)
  - `role`: Optional, must match `Role` enum (`CUSTOMER`, `TECHNICIAN`, `ADMIN`). Default is `CUSTOMER`.
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "user Registered Successfully.",
    "data": {
      "user": {
        "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+8801700000000",
        "activeStatus": "ACTIVE",
        "role": "CUSTOMER",
        "isVerified": false,
        "lastLoginAt": null,
        "userStatus": null,
        "createdAt": "2026-07-10T16:55:09.000Z",
        "updatedAt": "2026-07-10T16:55:09.000Z",
        "technicianProfile": null
      }
    }
  }
  ```

### Login User
* **Method:** `POST`
* **Endpoint:** `/api/auth/login`
* **Auth Required:** No
* **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "strongpassword123"
  }
  ```
* **Success Response (200 OK):**
  - Sets cookies `accessToken` (valid for 1 day) and `refreshToken` (valid for 7 days) in HTTP-only response cookies.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User is logged in successfully.",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### Refresh Token
* **Method:** `POST`
* **Endpoint:** `/api/auth/refresh-token`
* **Auth Required:** No (Reads `refreshToken` from client HTTP cookie)
* **Success Response (200 OK):**
  - Rotates `accessToken` cookie.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": " Token refreshed successfully.",
    "data": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

---

## User APIs

### Get Current Profile
* **Method:** `GET`
* **Endpoint:** `/api/auth/me`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`, `TECHNICIAN`, `CUSTOMER`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User profile fetched successfully.",
    "data": {
      "profile": {
        "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "phone": "+8801700000000",
        "role": "CUSTOMER",
        "technicianProfile": null
      }
    }
  }
  ```

### Update Current Profile
* **Method:** `PUT`
* **Endpoint:** `/api/auth/my-profile`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`, `TECHNICIAN`, `CUSTOMER`
* **Request Body:** (Supports partial parameters update)
  ```json
  {
    "name": "John Doe Updated",
    "email": "newemail@example.com",
    "bio": "Expert electrician profile.",
    "profilePhoto": "https://example.com/new.jpg",
    "description": "Short summary here",
    "profession": "ELECTRICIAN",
    "yearsOfExperience": 5,
    "hourlyRate": 45.0,
    "isAvailable": true,
    "address": "House 12, Road 5",
    "city": "Dhaka",
    "district": "Dhaka"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User profile updated successfully.",
    "data": {
      "updatedProfile": {
        "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
        "name": "John Doe Updated",
        "email": "newemail@example.com",
        "technicianProfile": {
          "bio": "Expert electrician profile.",
          "profession": "ELECTRICIAN",
          "yearsOfExperience": 5,
          "hourlyRate": "45.00",
          "isAvailable": true,
          "city": "Dhaka"
        }
      }
    }
  }
  ```

---

## Category APIs

### Get All Categories
* **Method:** `GET`
* **Endpoint:** `/api/categories`
* **Auth Required:** No
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Patched All Service Category successfully",
    "data": [
      {
        "id": "ed5696f7-a920-49cd-8afa-287f0aa78db8",
        "name": "Electrical Works",
        "slug": "electrical-works",
        "icon": "lightning-bolt",
        "description": "All electrical installations and maintenance",
        "isActive": true,
        "createdAt": "2026-07-10T16:55:09.000Z",
        "updatedAt": "2026-07-10T16:55:09.000Z"
      }
    ]
  }
  ```

---

## Service APIs

### Create Service Listing
* **Method:** `POST`
* **Endpoint:** `/api/services/create`
* **Auth Required:** Yes
* **Allowed Roles:** `TECHNICIAN`
* **Request Body:**
  ```json
  {
    "categoryId": "ed5696f7-a920-49cd-8afa-287f0aa78db8",
    "title": "Ceiling Fan Installation",
    "description": "Quick installation of standard indoor ceiling fans.",
    "price": 25.00,
    "priceType": "FIXED",
    "estimatedDuration": 45,
    "thumbnail": "https://example.com/fan.png",
    "isAvailable": true
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Service created successfully.",
    "data": {
      "id": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
      "technicianId": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
      "categoryId": "ed5696f7-a920-49cd-8afa-287f0aa78db8",
      "title": "Ceiling Fan Installation",
      "description": "Quick installation of standard indoor ceiling fans.",
      "price": "25.00",
      "priceType": "FIXED",
      "estimatedDuration": 45,
      "thumbnail": "https://example.com/fan.png",
      "isAvailable": true,
      "technician": {
        "id": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
        "userId": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd"
      },
      "reviews": []
    }
  }
  ```

### Get All Services
* **Method:** `GET`
* **Endpoint:** `/api/services`
* **Auth Required:** No
* **Query Parameters:** `categoryId`, `minRating`, `address`, `city`, `district`, `page`, `limit`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Services retrieved successfully",
    "data": [
      {
        "id": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
        "title": "Ceiling Fan Installation",
        "price": "25.00",
        "category": {
          "name": "Electrical Works"
        },
        "technician": {
          "city": "Dhaka"
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPage": 1
    }
  }
  ```

---

## Technician APIs

### List Technicians
* **Method:** `GET`
* **Endpoint:** `/api/technicians`
* **Auth Required:** No
* **Query Parameters:** `city`, `profession`, `isAvailable`, `isApproved`, `minExperience`, `minRating`, `maxHourlyRate`, `page`, `limit`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "technicians profile fetched successfully.",
    "data": [
      {
        "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
        "name": "John Doe Updated",
        "email": "newemail@example.com",
        "technicianProfile": {
          "profession": "ELECTRICIAN",
          "yearsOfExperience": 5,
          "isAvailable": true
        }
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPage": 1
    }
  }
  ```

### Get Technician Profile By User ID
* **Method:** `GET`
* **Endpoint:** `/api/technicians/:id`
* **Auth Required:** No
* **Path Parameters:** `id` (The User's ID)
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "technician profile fetched successfully.",
    "data": {
      "technician": {
        "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
        "name": "John Doe",
        "technicianProfile": {
          "id": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
          "bio": "Expert electrician profile."
        }
      }
    }
  }
  ```

### Create Availability Slots
* **Method:** `POST`
* **Endpoint:** `/api/technician/availability`
* **Auth Required:** Yes
* **Allowed Roles:** `TECHNICIAN`
* **Request Body:**
  ```json
  {
    "serviceId": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
    "date": "2026-08-10T00:00:00.000Z",
    "startsAt": "2026-08-10T09:00:00.000Z",
    "endsAt": "2026-08-10T10:00:00.000Z",
    "note": "Morning slot",
    "maxBookings": 1
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Availability slot created successfully.",
    "data": {
      "id": "7b8d8c9e-5d6c-482a-9e12-309df8c8a777",
      "serviceId": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
      "startsAt": "2026-08-10T09:00:00.000Z",
      "endsAt": "2026-08-10T10:00:00.000Z",
      "isAvailable": true,
      "isBooked": false
    }
  }
  ```

### Update Availability Slots
* **Method:** `PUT`
* **Endpoint:** `/api/technician/availability/:id`
* **Auth Required:** Yes
* **Allowed Roles:** `TECHNICIAN`
* **Path Parameters:** `id` (The Booking Slot ID)
* **Request Body:**
  ```json
  {
    "isAvailable": false,
    "note": "Unavailable slot due to sudden personal commitment"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Booking slot availability updated successfully.",
    "data": {
      "id": "7b8d8c9e-5d6c-482a-9e12-309df8c8a777",
      "isAvailable": false,
      "note": "Unavailable slot due to sudden personal commitment"
    }
  }
  ```

### Update Technician Profile Info
* **Method:** `PUT`
* **Endpoint:** `/api/technician/profile`
* **Auth Required:** Yes
* **Allowed Roles:** `TECHNICIAN`
* **Request Body:**
  ```json
  {
    "bio": "Expert painter",
    "profession": "PAINTER",
    "skills": "PAINTING",
    "yearsOfExperience": 7,
    "hourlyRate": 30.00
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Profile updated successfully.",
    "data": {
      "id": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
      "userId": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
      "bio": "Expert painter",
      "profession": "PAINTER",
      "skills": "PAINTING",
      "yearsOfExperience": 7,
      "hourlyRate": "30.00"
    }
  }
  ```

### Get Technician's Own Bookings
* **Method:** `GET`
* **Endpoint:** `/api/technician/bookings`
* **Auth Required:** Yes
* **Allowed Roles:** `TECHNICIAN`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Your all booking patched successfully.",
    "data": [
      {
        "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
        "customerId": "client-uuid-here",
        "status": "REQUESTED",
        "bookingSlots": [
          {
            "id": "slot-uuid",
            "startsAt": "2026-08-10T09:00:00.000Z"
          }
        ]
      }
    ]
  }
  ```

### Patch Booking Status (Accept/Decline/Complete)
* **Method:** `PATCH`
* **Endpoint:** `/api/technician/bookings/:id`
* **Auth Required:** Yes
* **Allowed Roles:** `TECHNICIAN`
* **Path Parameters:** `id` (The Booking ID)
* **Request Body:**
  ```json
  {
    "status": "ACCEPTED"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Booking status updated successfully.",
    "data": {
      "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
      "status": "ACCEPTED"
    }
  }
  ```

---

## Booking APIs

### Create Booking
* **Method:** `POST`
* **Endpoint:** `/api/bookings/create`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Request Body:**
  ```json
  {
    "technicianId": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
    "serviceId": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
    "note": "Please ring doorbell twice.",
    "bookingSlotIds": ["7b8d8c9e-5d6c-482a-9e12-309df8c8a777"]
  }
  ```
* **Success Response (201 Created):**
  - Triggers database transaction which marks the booking status to `REQUESTED` and updates the selected slots status (`isBooked: true`, `isAvailable: false`, incrementing `bookedCount`).
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Your Booking created successfully.",
    "data": {
      "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
      "customerId": "client-uuid",
      "technicianId": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
      "serviceId": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
      "status": "REQUESTED",
      "bookingSlots": [
        {
          "id": "7b8d8c9e-5d6c-482a-9e12-309df8c8a777",
          "isBooked": true
        }
      ]
    }
  }
  ```

### Get All Bookings (Global Log)
* **Method:** `GET`
* **Endpoint:** `/api/bookings`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Success Response (200 OK):**
  > [!NOTE]  
  > Returns all bookings created in the database. Filter constraints are not applied by client ID within the service queries in this endpoint version.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Bookings fetched successfully.",
    "data": [
      {
        "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
        "customer": { "name": "John Doe" },
        "service": { "title": "Ceiling Fan Installation" }
      }
    ]
  }
  ```

### Get Booking By ID
* **Method:** `GET`
* **Endpoint:** `/api/bookings/:id`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Path Parameters:** `id` (The Booking ID)
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Booking fetched successfully.",
    "data": {
      "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
      "status": "REQUESTED",
      "customer": { "name": "John Doe" },
      "technician": { "userId": "tech-uuid" },
      "service": { "title": "Ceiling Fan Installation" },
      "bookingSlots": []
    }
  }
  ```

---

## Payment APIs

### Create Card Payment Intent
* **Method:** `POST`
* **Endpoint:** `/api/payments/create`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Request Body:**
  ```json
  {
    "bookingId": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
    "amount": 25.00,
    "method": "CARD",
    "provider": "STRIPE",
    "currency": "USD"
  }
  ```
* **Success Response (200 OK):**
  - Creates a Stripe PaymentIntent and returns the client secret for browser processing.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Payment intent created successfully",
    "data": {
      "clientSecret": "pi_3MtwKsLkdIwHu7ix1_secret_vJt...",
      "paymentIntentId": "pi_3MtwKsLkdIwHu7ix1",
      "payment": {
        "id": "pay-uuid",
        "bookingId": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
        "status": "PENDING"
      }
    }
  }
  ```

### Create Stripe Checkout Session
* **Method:** `POST`
* **Endpoint:** `/api/payments/checkout`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Request Body:**
  ```json
  {
    "bookingId": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff"
  }
  ```
* **Success Response (200 OK):**
  - Generates Stripe checkout link redirecting to card insertion page.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Checkout complated successfully",
    "data": "https://checkout.stripe.com/c/pay/cs_test_..."
  }
  ```

### Stripe Webhook Listener
* **Method:** `POST`
* **Endpoint:** `/api/payments/webhook`
* **Auth Required:** No (Stripe Webhook Signature Verified)
* **Request Headers:**
  - `stripe-signature`: required for event construction.
* **Request Body:** Raw buffer parsed directly by Express.
* **Success Response (200 OK):**
  - Listens to `checkout.session.completed` events. Validates Stripe payload, performs upsert transactions on Payment status to `COMPLETED`, and shifts Booking status to `PAID`.
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Webhook triggered successfully.",
    "data": null
  }
  ```

### Get All Customer Payment History
* **Method:** `GET`
* **Endpoint:** `/api/payments`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "All Payment History patched successfully",
    "data": [
      {
        "id": "pay-uuid",
        "amount": 25.00,
        "status": "COMPLETED",
        "provider": "STRIPE",
        "createdAt": "2026-07-10T16:55:09.000Z"
      }
    ]
  }
  ```

### Get Payment Details By ID
* **Method:** `GET`
* **Endpoint:** `/api/payments/:id`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Path Parameters:** `id` (The Payment ID)
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Payment Details patched successfully",
    "data": {
      "id": "pay-uuid",
      "amount": 25.00,
      "status": "COMPLETED",
      "booking": {
        "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
        "status": "PAID"
      }
    }
  }
  ```

---

## Review APIs

### Submit Service Review
* **Method:** `POST`
* **Endpoint:** `/api/reviews`
* **Auth Required:** Yes
* **Allowed Roles:** `CUSTOMER`
* **Request Body:**
  ```json
  {
    "bookingId": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
    "technicianId": "0e8d9b23-2fc3-4e89-a21c-a11b0f55c2f3",
    "serviceId": "df47ccf3-445a-4934-bf34-a11c0f44d2d1",
    "rating": 5,
    "comment": "Exceptional installation quality. Fast and neat."
  }
  ```
* **Validation Rules:**
  - `bookingId`: Required. Booking must have status `COMPLETED`.
  - `rating`: Required, integer (e.g. 1-5).
  - Reviewer customer ID must match booking customer ID.
  - Reviews must not already exist for the selected `bookingId` (prevents duplicates).
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Review Created successfully.",
    "data": {
      "id": "rev-uuid",
      "rating": 5,
      "comment": "Exceptional installation quality. Fast and neat.",
      "customer": {
        "id": "client-uuid",
        "name": "John Doe",
        "email": "johndoe@example.com"
      }
    }
  }
  ```

---

## Admin APIs

### List All System Users
* **Method:** `GET`
* **Endpoint:** `/api/admin/users`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`
* **Query Parameters:** `name`, `email`, `role`, `activeStatus`, `isVerified`, `userStatus`, `page`, `limit`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User is logged in successfully.",
    "data": [
      {
        "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "CUSTOMER",
        "activeStatus": "ACTIVE"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPage": 1
    }
  }
  ```

### Update User Block Status (Ban/Unban)
* **Method:** `PATCH`
* **Endpoint:** `/api/admin/users/:id`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`
* **Path Parameters:** `id` (The User's ID)
* **Request Body:**
  ```json
  {
    "userStatus": "BAN"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User status updated successfully",
    "data": {
      "id": "a9bc99c9-a3b0-466a-bb02-40aed9f2dadd",
      "userStatus": "BAN"
    }
  }
  ```

### Create Service Category
* **Method:** `POST`
* **Endpoint:** `/api/admin/categories`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`
* **Request Body:**
  ```json
  {
    "name": "Plumbing Services",
    "icon": "water-tap",
    "description": "Leak repairs, tap installations, and drainage solutions."
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Category Created successfully",
    "data": {
      "id": "cat-uuid-999",
      "name": "Plumbing Services",
      "slug": "plumbing-services",
      "icon": "water-tap",
      "description": "Leak repairs, tap installations, and drainage solutions."
    }
  }
  ```

### Get All Categories (Admin Copy)
* **Method:** `GET`
* **Endpoint:** `/api/admin/categories`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Patched All Service Category successfully",
    "data": [
      {
        "id": "cat-uuid-999",
        "name": "Plumbing Services"
      }
    ]
  }
  ```

### Get All Bookings (Admin Copy)
* **Method:** `GET`
* **Endpoint:** `/api/admin/bookings`
* **Auth Required:** Yes
* **Allowed Roles:** `ADMIN`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Bookings fetched successfully.",
    "data": [
      {
        "id": "8c2d8b1c-8e3b-48bc-bdf8-cf1236daeeff",
        "customer": { "name": "John Doe" },
        "technician": { "id": "tech-uuid" },
        "service": { "title": "Ceiling Fan Installation" },
        "bookingSlots": []
      }
    ]
  }
  ```

---

# Query Parameters, Filtering, Searching, & Sorting

## Query Parameters
The backend routes capture query options using raw request strings. The table outlines parameters detected across code routines:

| Parameter | Type | Affected Enpoint | Matches Against Field |
|---|---|---|---|
| `page` | Integer | `GET /api/technicians`, `GET /api/services`, `GET /api/admin/users` | Offset calculation page index |
| `limit` | Integer | `GET /api/technicians`, `GET /api/services`, `GET /api/admin/users` | Page size constraints limit |
| `city` | String | `GET /api/technicians`, `GET /api/services` | case-insensitive match on profiles |
| `district` | String | `GET /api/services` | case-insensitive contains search |
| `address` | String | `GET /api/services` | case-insensitive contains search |
| `categoryId`| String | `GET /api/services` | Category relationship foreign key ID |
| `profession`| Enum | `GET /api/technicians` | Profile profession classification |
| `isAvailable`| Boolean | `GET /api/technicians` | Profile availability flag |
| `isApproved`| Boolean | `GET /api/technicians` | Profile verification state |
| `minExperience`| Integer| `GET /api/technicians` | yearsOfExperience >= minExperience |
| `minRating` | Float | `GET /api/technicians`, `GET /api/services` | averageRating >= minRating |
| `maxHourlyRate`| Float | `GET /api/technicians` | hourlyRate <= maxHourlyRate |
| `name` | String | `GET /api/admin/users` | case-insensitive contains search |
| `email` | String | `GET /api/admin/users` | case-insensitive contains search |
| `role` | Enum | `GET /api/admin/users` | matching role string |
| `activeStatus`| Enum | `GET /api/admin/users` | User status flag (ACTIVE/BLOCKED) |
| `userStatus`| Enum | `GET /api/admin/users` | Ban status classification (BAN/UNBAN) |
| `isVerified`| Boolean | `GET /api/admin/users` | User verified status flag |

## Filtering & Searching logic
* **Location Filtering:** Standard searches check technician profiles using `mode: "insensitive"` in Prisma.
* **Price & Experience bounds:** Minimum values use `gte` queries; maximum caps utilize `lte` filters.
* **Searching:** Implemented for Admin user queries on User `name` or `email` fields using `contains` operators combined with `insensitive` comparison modes. Searching is *not implemented in the current version* for services or public technicians (they only support structured criteria filters).

## Sorting
* **Sorting Logic:** *Not implemented in current version* on active database queries. Results are returned in order of creation (`orderBy: { createdAt: "desc" }` is used inside booking controllers, payment lists, and category registers). Sort criteria parameters (e.g. `sortBy`, `sortOrder`) are present on input interfaces but not integrated within query resolver logic.

## Pagination
Pagination defaults to `page = 1` and `limit = 10`. The calculation applies a standard skip equation:
$$\text{skip} = (\text{page} - 1) \times \text{limit}$$

The return metadata payload includes:
```json
"meta": {
  "page": 1,
  "limit": 10,
  "total": 12,
  "totalPage": 2
}
```

---

# Validation Rules

> [!NOTE]  
> Schema validation suites (such as Zod or Joi schemas) are **not implemented in current version**. Request payloads are validated programmatically inside services or resolved implicitly by database field maps.

### Registration Payloads (`POST /api/auth/register`):
* `name`: Required String (VarChar 255 constraint in db).
* `email`: Required String with format checking (Must be unique).
* `password`: Required String (Hashed with salt rounds configured in environment, defaults to 10).
* `role`: Enum values: `CUSTOMER`, `TECHNICIAN`, `ADMIN`.

### Service Creation (`POST /api/services/create`):
* `categoryId`: Required UUID.
* `title`: Required String (Technician cannot create duplicate services with the same title).
* `price`: Required Decimal (10, 2).
* `priceType`: Enum values: `FIXED`, `HOURLY`.

### Booking Creation (`POST /api/bookings/create`):
* `technicianId`: Required UUID.
* `serviceId`: Required UUID.
* `bookingSlotIds`: Required array of UUIDs (Each slot must be available and unbooked).

### Review Submissions (`POST /api/reviews`):
* `bookingId`: Required UUID (Booking status must be `COMPLETED`).
* `rating`: Required Integer (1 to 5 range validation).

---

# Error Handling

Express errors propagate to the `globalErrorHandler` middleware. The middleware inspects error types and maps them to HTTP responses:

* **Prisma Validation Errors (`PrismaClientValidationError`):** Resolves to Status `400 Bad Request` with message: *"You have provided incorrect field type of missing fields."*
* **Prisma Known Query Exceptions (`PrismaClientKnownRequestError`):**
  - **P2002 (Unique constraint failed):** Resolves to Status `400 Bad Request` with message: *"Buplicate Key Error"*.
  - **P2003 (Foreign key validation failed):** Resolves to Status `400 Bad Request` with message: *"Foreign key constraint failed."*.
  - **P2025 (Relation target not found):** Resolves to Status `400 Bad Request` with message: *"An operation failed because it depends on one or more records that were required but not found."*.
* **Prisma DB Connection Failures (`PrismaClientInitializationError`):**
  - **P1000 (Authentication error):** Resolves to Status `401 Unauthorized` with message: *"Authentication faild against database server. Please Check Your Credentials."*.
  - **P1001 (Server unreachable):** Resolves to Status `400 Bad Request` with message: *"Can't reach database server"*.
* **Prisma Runtime Failures (`PrismaClientUnknownRequestError`):** Resolves to Status `500 Internal Server Error` with message: *"Error Occured during query execution."*.

---

# Environment Variables

| Variable | Description | Required | Default |
|---|---|---|---|
| `PORT` | Listening port for the application server | No | `5000` |
| `DATABASE_URL` | Connection string for Postgres database instance | Yes | *None* |
| `APP_URL` | Base application frontend address for CORS mapping | No | `http://localhost:5000` |
| `BCRYPT_SALT_ROUNDS` | Cryptographic salt execution rounds for passwords | No | `10` |
| `JWT_ACCESS_SECRET` | Signing secret key for short-lived access JWT tokens | Yes | *None* |
| `JWT_REFRESH_SECRET` | Signing secret key for session refresh JWT tokens | Yes | *None* |
| `JWT_ACCESS_EXPIRES_IN`| Expiry duration for access token (e.g. `1d`) | Yes | *None* |
| `JWT_REFRESH_EXPIRES_IN`| Expiry duration for refresh token (e.g. `7d`) | Yes | *None* |
| `STRIPE_SECRET_KEY` | Private secret key API credential for Stripe SDK | Yes | *None* |
| `STRIPE_PRICE_ID` | Mapped price identifier product for checkout sessions | Yes | *None* |
| `STRIPE_WEBHOOK_SECRET`| Stripe webhook secret to verify payload signatures | Yes | *None* |

---

# Installation & Running Locally

### 1. Clone Project
```bash
git clone https://github.com/AyanSujon/FixItNow-Server-Side.git
cd FixItNow-Server-Side
```

### 2. Install Packages
```bash
npm install
```

### 3. Setup Configuration
Create a `.env` file in the project root based on the provided configuration variables:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/fixitnow?schema=public"
APP_URL="http://localhost:5000"
BCRYPT_SALT_ROUNDS=10
JWT_ACCESS_SECRET="yourAccessSecretHere"
JWT_REFRESH_SECRET="yourRefreshSecretHere"
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Build and Launch Database Clients
Run the Prisma generator to output client files matching schema specifications:
```bash
npx prisma generate
```

### 5. Execute DB Migrations
Migrate database tables into Postgres:
```bash
npx prisma migrate dev --name init
```

### 6. Boot Application Server
Launch local server with hot reloading enabled:
```bash
npm run dev
```

---

# Build & Scripts

All commands defined under `package.json` scripts:

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `tsx watch src/server.ts` | Runs server dynamically, watching source modifications. |
| `npm run build` | `tsc` | Transpiles TypeScript files into pure JavaScript outputs in `/dist`. |
| `npm run start` | `node dist/server.js` | Launches compiled production builds. |
| `npm run stripe:webhook` | `stripe listen --forward-to localhost:5000/api/payments/webhook` | Listens to Stripe CLI commands and forwards payloads. |
| `npm run test` | `echo "Error: no test specified"` | *Not implemented in current version*. |

---

# Deployment

### Compilation
Convert TypeScript source code into production JavaScript:
```bash
npm run build
```

### Database Migration
Before launching the server, execute migrations on the production database:
```bash
npx prisma migrate deploy
```

### Process Management
Run the compiled JavaScript using process managers like PM2 or directly:
```bash
npm run start
```

---

# Future Improvements

* **Request Validation Middleware:** Introduce `Zod` or `Joi` schema checks to sanitize API request payloads before execution.
* **Unified Error Status codes:** Refactor the global error handler middleware so that Express responses use the actual HTTP status code parsed from the error rather than hardcoding `500`.
* **Database Constraints Cleanup:** Add `serviceArea` database columns to sync the profile updating logic with the schema definitions.
* **Customer Bookings Constraints:** Restrict `GET /api/bookings` so that standard customer roles can only view their own booking history logs, leaving global logs reserved for administrators.
* **Query Enhancements:** Fully implement the search and sorting fields defined in interfaces (e.g. searching services by keyword, sorting services by rating or price in DB queries).
* **SSLCommerz Integration:** Fully implement SSLCommerz payments (the enum value is declared in `enums.prisma` but not integrated).

---

# License

Distributed under the **ISC License**. See `LICENSE` or `package.json` details.




