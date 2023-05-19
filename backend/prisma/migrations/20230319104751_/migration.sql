/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `street` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nationality` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "nationality" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "emailToken" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
