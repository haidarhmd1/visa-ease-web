import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import { generateString } from '../utils/randomString';
import logging from '../config/logging';

const NAMESPACE = 'Visa Application';
const prisma = new PrismaClient();

/*
  Visa application
 */
export const getAllVisaApplications = async (
  request: Request,
  response: Response
) => {
  logging.info(NAMESPACE, 'getAllVisaApplications');
  if (!response.locals.jwt) return;
  const id = response.locals.jwt.userId;
  const visaApplications = await prisma.visaApplication.findMany({
    where: { userId: id },
  });

  if (!visaApplications) {
    // eslint-disable-next-line consistent-return
    return response.status(404).send({ message: 'No Visa Applications Found' });
  }

  // eslint-disable-next-line consistent-return
  return response.status(200).send(visaApplications);
};

export const getVisaApplicationById = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const visaApplications = await prisma.visaApplication.findUnique({
    where: { id },
    include: {
      FlightInformation: true,
      Documents: true,
      Agreement: true,
    },
  });

  if (!visaApplications) {
    // eslint-disable-next-line consistent-return
    return response.status(404).send({ message: 'No Visa Applications Found' });
  }

  // eslint-disable-next-line consistent-return
  return response.status(200).send(visaApplications);
};

export const createVisaApplication = async (
  request: Request,
  response: Response
) => {
  if (!response.locals.jwt) return;
  const id = response.locals.jwt.userId;

  const { country, visaProcessingType } = request.body;
  const visaApplicationId = generateString(10);
  try {
    const visaApplication = await prisma.visaApplication.create({
      data: { userId: id, visaApplicationId, country, visaProcessingType },
    });
    response.status(201).json(visaApplication);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    response.status(error.statusCode || 500).json({
      message: error.message || 'Error creating visa application',
      error,
    });
  }
};

export const updateVisaApplication = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;
  const { status } = request.body;

  const visaApplicationExists = await prisma.visaApplication.findUnique({
    where: {
      id,
    },
  });

  if (!visaApplicationExists) {
    return response.status(404).json({ message: 'Visa application not found' });
  }

  const visaApplication = await prisma.visaApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  return response.status(201).json(visaApplication);
};
