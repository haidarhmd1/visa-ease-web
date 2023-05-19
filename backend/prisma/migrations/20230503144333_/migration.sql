/*
  Warnings:

  - Added the required column `country` to the `VisaApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VisaApplication" ADD COLUMN     "country" VARCHAR(255) NOT NULL;
