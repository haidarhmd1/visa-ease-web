-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED');

-- CreateEnum
CREATE TYPE "KindOfTrip" AS ENUM ('SINGLE_ENTRY', 'MULTIPLE_ENTRY');

-- CreateEnum
CREATE TYPE "VisaStatus" AS ENUM ('IN_PROGRESS', 'NOT_STARTED', 'PENDING', 'NOT_PAID', 'PAID', 'COMPLETED', 'READY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullname" VARCHAR(255) NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "dob" TIMESTAMP(3) NOT NULL,
    "street" VARCHAR(255),
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "acceptTermsAndConditions" BOOLEAN NOT NULL DEFAULT false,
    "zipCode" VARCHAR(255),
    "city" VARCHAR(255),
    "country" VARCHAR(255),
    "nationality" VARCHAR(255),
    "profession" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255),
    "maritalStatus" "MaritalStatus" NOT NULL DEFAULT 'SINGLE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisaApplication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "VisaStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "userId" TEXT NOT NULL,

    CONSTRAINT "VisaApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlightInformation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expectedTravelStartDate" TIMESTAMP(3) NOT NULL,
    "expectedReturnFlightDate" TIMESTAMP(3) NOT NULL,
    "cruise" BOOLEAN NOT NULL DEFAULT false,
    "invoiceRecipientSameAsApplicant" BOOLEAN NOT NULL DEFAULT true,
    "additionalAddress" VARCHAR(255),
    "kindOfTrip" "KindOfTrip" NOT NULL DEFAULT 'SINGLE_ENTRY',
    "visa_ApplicationId" TEXT NOT NULL,

    CONSTRAINT "FlightInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Documents" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "passportImageFilePath" VARCHAR(255),
    "biometricImageFilePath" VARCHAR(255),
    "residencePermitFrontImageFilePath" VARCHAR(255),
    "residencePermitBackImageFilePath" VARCHAR(255),
    "visa_ApplicationId" TEXT NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agreement" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "place" VARCHAR(255) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "signatureFile" VARCHAR(255) NOT NULL,
    "visa_ApplicationId" TEXT NOT NULL,

    CONSTRAINT "Agreement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "FlightInformation_visa_ApplicationId_key" ON "FlightInformation"("visa_ApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Documents_visa_ApplicationId_key" ON "Documents"("visa_ApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "Agreement_visa_ApplicationId_key" ON "Agreement"("visa_ApplicationId");

-- AddForeignKey
ALTER TABLE "VisaApplication" ADD CONSTRAINT "VisaApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightInformation" ADD CONSTRAINT "FlightInformation_visa_ApplicationId_fkey" FOREIGN KEY ("visa_ApplicationId") REFERENCES "VisaApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documents" ADD CONSTRAINT "Documents_visa_ApplicationId_fkey" FOREIGN KEY ("visa_ApplicationId") REFERENCES "VisaApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_visa_ApplicationId_fkey" FOREIGN KEY ("visa_ApplicationId") REFERENCES "VisaApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
