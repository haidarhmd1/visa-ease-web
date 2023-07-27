-- CreateTable
CREATE TABLE "CountriesList" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "information" TEXT NOT NULL,
    "weNeed" TEXT NOT NULL,
    "countrieNotAllowed" VARCHAR(255) NOT NULL,
    "countrieNoVisaNeed" VARCHAR(255) NOT NULL,
    "imageFilePath" VARCHAR(255) NOT NULL,
    "imageName" VARCHAR(255) NOT NULL,

    CONSTRAINT "CountriesList_pkey" PRIMARY KEY ("id")
);
