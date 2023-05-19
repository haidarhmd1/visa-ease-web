import express, { json, RequestHandler } from 'express';

import { z, ZodSchema } from 'zod';
import { requestMutating, RequestMutatingRequestHandler } from 'utils/router';
import { badRequest } from '@hapi/boom';

const validateParametersSchema = <T extends ZodSchema<Record<string, string>>>(
    schema: T
  ): RequestMutatingRequestHandler<{ parsedParams: z.infer<T> }> =>
    requestMutating(async (request, response, next) => {
      try {
        const parsedParameters = schema.parse(request.params);
        request.params = parsedParameters;
        return next({ parsedParams: parsedParameters });
      } catch (error) {
        throw badRequest('validateParametersSchema', error);
      }
    });