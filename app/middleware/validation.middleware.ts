import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';

function bodyValidationMiddleware<T>(type: any): express.RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.body)).then(errors => {
      if (errors.length > 0) {
        const message =
          'Validation error(s): ' +
          errors.map(error => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      } else {
        next();
      }
    });
  };
}

export default bodyValidationMiddleware;
