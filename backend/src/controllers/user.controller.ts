/* eslint-disable max-lines */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable sonarjs/no-duplicate-string */
import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { PrismaClient, Gender, MaritalStatus } from '@prisma/client';
import boom from '@hapi/boom';
import path from 'path';
import * as fs from 'fs/promises';
import { OK } from 'http-status';
import { generateString } from '../utils/randomString';
import { sendRegisterEmail } from '../utils/sendgridEmail';
import { signJWT } from '../utils/authHandler';
import logging from '../config/logging';
import { FILE_PATH } from '../middlewares/upload';

const NAMESPACE = 'User';

const prisma = new PrismaClient();

const validateToken = (request: Request, response: Response) => {
  logging.info(NAMESPACE, 'Token validated, user authorized.');

  return response.status(200).json({
    message: 'Token(s) validated',
  });
};

const resendEmailToken = async (request: Request, response: Response) => {
  const { id } = request.params;

  const findUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!findUser) {
    logging.error(NAMESPACE, `anauthorized`);
    throw boom.unauthorized(`anauthorized`);
  }

  try {
    const emailToken = generateString(5);
    const user = await prisma.user.update({
      data: {
        emailToken,
      },
      where: { id },
    });

    if (!user) return;

    await sendRegisterEmail(findUser.email, findUser.fullname, emailToken);

    logging.info(NAMESPACE, `user token updated: ${emailToken}`);
    response.send(OK);
  } catch (error) {
    logging.error(NAMESPACE, 'server error occurred', error);
    throw boom.notFound('user token not found');
  }
};

const verifyAccount = async (request: Request, response: Response) => {
  const { id } = request.params;
  const { token } = request.body;

  const findUser = await prisma.user.findUnique({
    where: { id },
  });

  if (!findUser) {
    logging.error(NAMESPACE, `anauthorized`);
    throw boom.unauthorized(`anauthorized`);
  }

  // eslint-disable-next-line security/detect-possible-timing-attacks
  if (findUser.emailToken.toString().trim() !== token.toString().trim()) {
    logging.error(NAMESPACE, 'invalid token');
    throw boom.conflict('Invalid Token');
  }

  try {
    const user = await prisma.user.update({
      data: {
        emailConfirmed: true,
      },
      where: { id },
    });

    if (!user) return;

    logging.info(NAMESPACE, `user with token: ${token} verified`);
    response.send(OK);
  } catch (error) {
    logging.error(NAMESPACE, 'server error occurred', error);
    throw boom.notFound('user token not found');
  }
};

const changePassword = async (request: Request, response: Response) => {
  if (!response.locals.jwt) return;
  const id = response.locals.jwt.userId;

  const { oldPassword, newPassword } = request.body;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) return response.sendStatus(404);

  const passwordMatches = await bcryptjs.compare(oldPassword, user?.password);

  if (!passwordMatches) return response.sendStatus(405);

  const hashedPassword = await bcryptjs.hash(newPassword, 10);

  const updatePassword = await prisma.user.update({
    where: { id },
    data: {
      password: hashedPassword,
    },
  });

  if (!updatePassword) return response.sendStatus(401);

  return response.sendStatus(201);
};

const register = async (request: Request, response: Response) => {
  const {
    fullname,
    gender,
    dob,
    street,
    email,
    password,
    acceptTermsAndConditions,
    zipCode,
    city,
    country,
    nationality,
    profession,
    phone,
    maritalStatus,
    visaApplication,
  } = request.body;

  // Convert the email to lowercase
  const lowerCaseEmail = email.toLowerCase();

  const hashedPassword = await bcryptjs.hash(password, 10);

  const findSimilarUser = await prisma.user.findUnique({
    where: { email: lowerCaseEmail },
  });

  const findSimilarUserPhone = await prisma.user.findUnique({
    where: { phone },
  });

  if (findSimilarUser) {
    logging.error(NAMESPACE, 'An Account with this email already exists');

    return response.status(400).json({
      message: 'An Account with this email already exists',
    });
  }

  if (findSimilarUserPhone) {
    logging.error(
      NAMESPACE,
      'An Account with this phone number already exists'
    );
    return response.status(400).json({
      message: 'An Account with this phone number already exists',
    });
  }

  const emailToken = generateString(5);

  const date = new Date(dob);

  const user = await prisma.user.create({
    data: {
      fullname,
      gender: gender ?? Gender.MALE,
      dob: date,
      street,
      email: lowerCaseEmail,
      password: hashedPassword,
      acceptTermsAndConditions,
      zipCode: zipCode ?? '',
      city,
      country,
      nationality,
      profession,
      phone,
      maritalStatus: maritalStatus ?? MaritalStatus.SINGLE,
      emailToken,
      visaApplication,
    },
  });

  if (!user) {
    logging.error(NAMESPACE, 'Server error');
    const error = boom.internal('Server error');
    return response.status(error.output.statusCode).json(error.output.payload);
  }

  const sendVerificationMail = await sendRegisterEmail(
    email,
    fullname,
    emailToken
  );

  if (!sendVerificationMail) {
    return response.status(400).json({
      message: 'Error sending email',
    });
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
  try {
    if (!response.locals.jwt) return;
    const id = response.locals.jwt.userId;

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

  const data: any = {
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
  if (!response.locals.jwt) return;
  const id = response.locals.jwt.userId;

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

    return response.sendStatus(200);
  } catch {
    return response.sendStatus(500);
  }
};

// Login
const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  // Convert the email to lowercase
  const lowerCaseEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: lowerCaseEmail },
  });

  if (!user) {
    return response.status(404).json({
      message: 'User with the account not found',
    });
  }

  if (!user?.emailConfirmed) {
    return response.status(400).json({
      userId: user.id,
      message: 'You must confirm your email in order to sign in',
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

// Forgot Password
const forgotPassword = async (request: Request, response: Response) => {
  const { email } = request.body;

  // Convert the email to lowercase
  const lowerCaseEmail = email.toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: lowerCaseEmail },
  });

  if (!user) {
    return response.status(404).json({
      message: 'User with the account not found',
    });
  }

  const randomString = generateString(10);

  const hashedPassword = await bcryptjs.hash(randomString, 10);

  const setTemporaryPassword = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!setTemporaryPassword) {
    return response.status(400).json({
      message:
        'Something went wrong, please contact us if this error further exists.',
    });
  }

  return response.status(200).send({ message: randomString });
};

export default {
  resendEmailToken,
  verifyAccount,
  validateToken,
  register,
  forgotPassword,
  changePassword,
  login,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
