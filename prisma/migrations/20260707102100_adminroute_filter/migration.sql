-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('BAN', 'UNBAN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userStatus" "userStatus";
