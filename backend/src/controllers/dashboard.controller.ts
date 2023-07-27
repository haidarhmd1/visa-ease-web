/* eslint-disable max-lines */
/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import boom from '@hapi/boom';
import path from 'path';
import * as fs from 'fs/promises';
import { OK } from 'http-status';
import { signJWT } from '../utils/authHandler';
import logging from '../config/logging';
import { FILE_PATH } from '../middlewares/upload';

const NAMESPACE = 'Dashboard';

const prisma = new PrismaClient();

const validateToken = (request: Request, response: Response) => {
  logging.info(NAMESPACE, 'Token validated, user authorized.');

  return response.status(200).json({
    message: 'Token(s) validated',
  });
};

const register = async (request: Request, response: Response) => {
  const { fullname, email, password } = request.body;
  // Convert the email to lowercase
  const lowerCaseEmail = email.toLowerCase();

  const hashedPassword = await bcryptjs.hash(password, 10);

  const findSimilarUser = await prisma.dashboardUser.findUnique({
    where: { email: lowerCaseEmail },
  });

  if (findSimilarUser) {
    logging.error(NAMESPACE, 'An Account with this email already exists');

    return response.status(400).json({
      message: 'An Account with this email already exists',
    });
  }

  const user = await prisma.dashboardUser.create({
    data: {
      fullname,
      email: lowerCaseEmail,
      password: hashedPassword,
    },
  });

  if (!user) {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    logging.error(NAMESPACE, 'Server error');
    const error = boom.internal('Server error');
    return response.status(error.output.statusCode).json(error.output.payload);
  }

  logging.info(NAMESPACE, 'Register, User successfully created');
  return response.json(user);
};

const getAllUsers = async (request: Request, response: Response) => {
  const users = await prisma.user.findMany();
  response.status(OK).send(users);
};

// READ operation
const getUser = async (request: Request, response: Response) => {
  if (!response.locals.jwt) return;
  const id = response.locals.jwt.userId;
  try {
    const user = await prisma.dashboardUser.findUnique({ where: { id } });

    if (!user) {
      const error = boom.notFound('User not found');
      return response
        .status(error.output.statusCode)
        .json(error.output.payload);
    }
    return response.json(user);
  } catch (error_) {
    logging.error(NAMESPACE, 'Server error', error_);
    const error = boom.internal('Server error');
    return response.status(error.output.statusCode).json(error.output.payload);
  }
};

// READ operation
const getSingleVisaUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      const error = boom.notFound('User not found');
      return response
        .status(error.output.statusCode)
        .json(error.output.payload);
    }
    return response.json(user);
  } catch (error_) {
    logging.error(NAMESPACE, 'Server error', error_);
    const error = boom.internal('Server error');
    return response.status(error.output.statusCode).json(error.output.payload);
  }
};

// UPDATE operation
const updateUser = async (request: Request, response: Response) => {
  if (!response.locals.jwt) return;
  const id = response.locals.jwt.userId;

  const {
    fullname,
    gender,
    dob,
    street,
    zipCode,
    city,
    country,
    nationality,
    profession,
    phone,
    maritalStatus,
  } = request.body;

  const date = new Date(dob);

  const data = {
    fullname,
    gender,
    dob: date,
    street,
    zipCode,
    city,
    country,
    nationality,
    profession,
    phone,
    maritalStatus,
  };

  const user = await prisma.user.update({
    where: { id },
    data,
  });

  if (!user) {
    return response.sendStatus(400);
  }

  return response.json(user);
};

// delete user
const deleteUser = async (request: Request, response: Response) => {
  const { id } = request.params;

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return response.sendStatus(404);

  try {
    const visaApplications = await prisma.visaApplication.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        Documents: true,
        Agreement: true,
        FlightInformation: true,
      },
    });

    const deleteVisaApplication = prisma.visaApplication.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const deleteDocuments = prisma.documents.deleteMany({
      where: {
        visa_ApplicationId: {
          in: visaApplications.map(v => v.id),
        },
      },
    });

    const deleteAgreement = prisma.agreement.deleteMany({
      where: {
        visa_ApplicationId: {
          in: visaApplications.map(v => v.id),
        },
      },
    });

    const deleteFlightInformation = prisma.flightInformation.deleteMany({
      where: {
        visa_ApplicationId: {
          in: visaApplications.map(v => v.id),
        },
      },
    });

    const documentsToDelete = await prisma.documents.findMany({
      where: {
        visa_ApplicationId: {
          in: visaApplications.map(v => v.id),
        },
      },
      select: {
        documentImageFilePath: true,
      },
    });

    await documentsToDelete.map(d =>
      // eslint-disable-next-line security/detect-non-literal-fs-filename
      fs.unlink(
        path.join(FILE_PATH, '/documents/', d.documentImageFilePath as string)
      )
    );

    await prisma.user.delete({
      where: { id },
    });

    await prisma.$transaction([
      deleteDocuments,
      deleteAgreement,
      deleteFlightInformation,
      deleteVisaApplication,
    ]);
  } catch {
    return response.sendStatus(500);
  }
};

// Login
const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // Convert the email to lowercase
  const lowerCaseEmail = email.toLowerCase();

  const user = await prisma.dashboardUser.findUnique({
    where: { email: lowerCaseEmail },
  });

  if (!user) {
    return response.status(404).json({
      message: 'User with the account not found',
    });
  }

  const passwordMatches = await bcryptjs.compare(password, user.password);

  if (!passwordMatches) {
    return response.status(401).json({
      message: 'Invalid password',
    });
  }

  signJWT(user, (_error, token) => {
    if (_error) {
      return response.status(500).json({
        message: 'error signing JWT',
        error: _error,
      });
    }
    if (token) {
      logging.info(NAMESPACE, 'login, User successfully logged in');
      return response.status(OK).send({
        token,
      });
    }
  });
};

const getAllVisasByUser = async (request: Request, response: Response) => {
  const { id } = request.params;
  const getAllUserData = await prisma.visaApplication.findMany({
    where: { userId: id },
    include: {
      user: true,
      FlightInformation: true,
      Documents: true,
      Agreement: true,
    },
  });

  if (!getAllUserData) {
    return response.sendStatus(404);
  }

  return response.send(getAllUserData);
};

// TODO add country CRUD controller

const getAllCountries = async (request: Request, response: Response) => {
  // if (!response.locals.jwt) return;
  // const id = response.locals.jwt.userId;
};

const getSingleCountryById = async (request: Request, response: Response) => {};

const addNewCountry = async (request: Request, response: Response) => {};

const updateCountry = async (request: Request, response: Response) => {};

const deleteCountry = async (request: Request, response: Response) => {};

export default {
  validateToken,
  register,
  login,
  getAllUsers,
  getUser,
  getSingleVisaUser,
  updateUser,
  deleteUser,
  getAllVisasByUser,
  getAllCountries,
  getSingleCountryById,
  addNewCountry,
  updateCountry,
  deleteCountry,
};
