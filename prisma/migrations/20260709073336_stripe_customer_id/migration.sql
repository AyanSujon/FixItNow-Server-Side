-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "stripeCustomerId" TEXT;

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "bookingDate" SET DEFAULT CURRENT_TIMESTAMP;
