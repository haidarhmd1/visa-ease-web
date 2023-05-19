/*
  Warnings:

  - You are about to drop the column `documentName` on the `Documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Documents" DROP COLUMN "documentName",
ADD COLUMN     "documentNameType" VARCHAR(255);
