-- CreateEnum
CREATE TYPE "VisaProcessingType" AS ENUM ('STANDARD', 'EXPRESS');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VisaStatus" ADD VALUE 'CANCELLED';
ALTER TYPE "VisaStatus" ADD VALUE 'PAYMENT_PENDING';

-- AlterTable
ALTER TABLE "VisaApplication" ADD COLUMN     "visaProcessingType" "VisaProcessingType" NOT NULL DEFAULT 'STANDARD';

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
