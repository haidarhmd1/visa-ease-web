import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getAgreementById = async (
  request: Request,
  response: Response
) => {
  const { visaId } = request.params;

  const agreement = prisma.agreement.findUnique({
    where: {
      visa_ApplicationId: visaId,
    },
  });

  if (!agreement) {
    return response.status(404).send('Agreement not found');
  }

  return response.status(200).send(agreement);
};

export const setAgreement = async (request: Request, response: Response) => {
  const { visaId } = request.params;
  const { date, place } = request.body;

  const dateDate = new Date(date);

  const agreement = await prisma.agreement.create({
    data: {
      visa_ApplicationId: visaId,
      date: dateDate,
      place,
    },
  });

  if (!agreement) {
    return response.status(500).send('Error saving agreement');
  }

  const updateStatus = await prisma.visaApplication.update({
    where: { id: visaId },
    data: { status: 'PENDING' },
  });

  if (!updateStatus) {
    return response.status(500).send('Error saving agreement');
  }

  return response.status(200).send(agreement);
};

export const updateAgreement = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { date, place } = request.body;

  const agreement = prisma.agreement.update({
    where: { id },
    data: {
      date,
      place,
    },
  });

  if (!agreement) {
    return response.status(500).send('Error updating agreement');
  }

  return response.status(200).send(agreement);
};
