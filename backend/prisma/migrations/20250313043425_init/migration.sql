/*
  Warnings:

  - You are about to drop the column `phone` on the `FamilyMember` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_paymentMethodId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentMethod" DROP CONSTRAINT "PaymentMethod_userId_fkey";

-- AlterTable
ALTER TABLE "FamilyMember" DROP COLUMN "phone",
ADD COLUMN     "phoneNumber" TEXT;

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "PaymentMethod";

-- DropEnum
DROP TYPE "BookingType";
