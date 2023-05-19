import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import logging from '../config/logging';

const NAMESPACE = 'utils/router';

export const validate =
  (schema: AnyZodObject) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params,
      });
      return next();
    } catch (error) {
      logging.info(NAMESPACE, 'error validate function', error);

      return response.status(400).send(error);
    }
  };
