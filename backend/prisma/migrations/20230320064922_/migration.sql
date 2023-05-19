/*
  Warnings:

  - A unique constraint covering the columns `[visaApplicationId]` on the table `VisaApplication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `visaApplicationId` to the `VisaApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VisaApplication" ADD COLUMN     "visaApplicationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VisaApplication_visaApplicationId_key" ON "VisaApplication"("visaApplicationId");
