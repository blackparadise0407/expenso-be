import { ValidationError } from 'class-validator';
import { ErrorRequestHandler, RequestHandler } from 'express';

import { HttpStatus } from '../enums/HttpStatusEnum';
import { HttpException } from '../exceptions/HttpException';
import { NotFoundException } from '../exceptions/NotFoundException';

interface IAppError {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  message: string;
  status: HttpStatus;
  timestamp: number;
}

export const notFound: RequestHandler = (_req, _res, next) => {
  const exception = new NotFoundException();
  next(exception);
};

export const error: ErrorRequestHandler = (err, req, res, _next) => {
  const error = {
    errors: null,
  } as IAppError;
  if (err instanceof Error) {
    error.message = err.message;
  }
  if (err instanceof HttpException) {
    error.status = err.status;
  }
  if (Array.isArray(err) && err instanceof Array<ValidationError>) {
    error.errors = err.map((e) => ({
      field: e.property,
      errors: e.constraints,
    }));
    error.status = HttpStatus.BAD_REQUEST;
    error.message = 'Validation error occured';
  }
  error.path = req.originalUrl;
  error.timestamp = Date.now();
  return res.send(error).status(error.status);
};
