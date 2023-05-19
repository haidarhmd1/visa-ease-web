/*
  Warnings:

  - You are about to drop the column `biometricImageFilePath` on the `Documents` table. All the data in the column will be lost.
  - You are about to drop the column `passportImageFilePath` on the `Documents` table. All the data in the column will be lost.
  - You are about to drop the column `residencePermitBackImageFilePath` on the `Documents` table. All the data in the column will be lost.
  - You are about to drop the column `residencePermitFrontImageFilePath` on the `Documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "biometricImageFilePath",
DROP COLUMN "passportImageFilePath",
DROP COLUMN "residencePermitBackImageFilePath",
DROP COLUMN "residencePermitFrontImageFilePath",
ADD COLUMN     "documentImageFilePath" VARCHAR(255),
ADD COLUMN     "documentName" VARCHAR(255);
