/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config/config';
import logging from '../config/logging';

const NAMESPACE = 'Auth';

export const validateJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, 'Validating token');

  const token = request.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, config.server.token.secret, (error, decoded) => {
      if (error) {
        return response.status(401).json({
          message: error,
          error,
        });
      }
      response.locals.jwt = decoded;
      next();
    });
  } else {
    return response.status(403).json({
      message: 'Unauthorized',
    });
  }
};
