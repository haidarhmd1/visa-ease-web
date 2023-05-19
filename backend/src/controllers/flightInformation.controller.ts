import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getFlightInformationById = async (
  request: Request,
  response: Response
) => {
  const { visaId } = request.params;

  const flightInfo = await prisma.flightInformation.findUnique({
    where: { visa_ApplicationId: visaId },
  });

  return response.sendStatus(200).json(flightInfo);
};

export const createFlightInformation = async (
  request: Request,
  response: Response
) => {
  const { visaId } = request.params;

  const {
    travelStartDate,
    returnFlightDate,
    cruise,
    kindOfVisa,
    recipientSameAsApplicant,
    invoiceAddress,
  } = request.body;

  const expectedTravelStartDateDateTime = new Date(travelStartDate);
  const expectedReturnFlightDateDateTime = new Date(returnFlightDate);

  const data = {
    expectedTravelStartDate: expectedTravelStartDateDateTime,
    expectedReturnFlightDate: expectedReturnFlightDateDateTime,
    cruise: JSON.parse(cruise.value),
    invoiceRecipientSameAsApplicant: JSON.parse(recipientSameAsApplicant.value),
    additionalAddress: invoiceAddress,
    kindOfTrip: kindOfVisa.value,
    visa_ApplicationId: visaId,
  };

  const flightInfo = await prisma.flightInformation.upsert({
    where: {
      visa_ApplicationId: visaId,
    },
    create: data,
    update: data,
  });

  if (!flightInfo) {
    return response.sendStatus(500).json({
      message: 'Error creating flight information',
    });
  }

  return response.sendStatus(200).json(flightInfo);
};

export const updateFlightInformation = async (
  request: Request,
  response: Response
) => {
  const { visaId } = request.params;
  const {
    expectedTravelStartDate,
    expectedReturnFlightDate,
    cruise,
    invoiceRecipientSameAsApplicant,
    additionalAddress,
    kindOfTrip,
  } = request.body;

  const expectedTravelStartDateDateTime = new Date(expectedTravelStartDate);
  const expectedReturnFlightDateDateTime = new Date(expectedReturnFlightDate);

  const flightInfo = await prisma.flightInformation.update({
    where: {
      visa_ApplicationId: visaId,
    },
    data: {
      expectedTravelStartDate: expectedTravelStartDateDateTime,
      expectedReturnFlightDate: expectedReturnFlightDateDateTime,
      cruise,
      invoiceRecipientSameAsApplicant,
      additionalAddress,
      kindOfTrip,
    },
  });

  if (!flightInfo) {
    return response.sendStatus(500).json({
      message: 'Error creating flight information',
    });
  }

  return response.sendStatus(200).json(flightInfo);
};
