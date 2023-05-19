import { isBoom, Boom } from '@hapi/boom';
import { NextFunction, Request, Response, response } from 'express';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (isBoom(error)) return boomErrorHandler(error, request, response);

  return defaultErrorHandler(error, request, response);
};

const boomErrorHandler = (
  boomError: Boom,
  request: Request,
  response: Response
) => {
  const { payload } = boomError.output;
  if (boomError.data) payload.data = boomError.data;
  response.status(boomError.output.statusCode).send(payload);
};

const defaultErrorHandler = async (
  error: Error,
  request: Request,
  response: Response
) => {
  response.status(500).send('PANIC!');
};
