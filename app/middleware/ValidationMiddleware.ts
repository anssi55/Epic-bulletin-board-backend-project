import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import * as express from 'express';
import Boom from 'boom';

class ValidationMiddleware {
  public validateBody<T>(type: any): express.RequestHandler {
    return (req, res, next) => {
      validate(plainToClass(type, req.body)).then(errors => {
        if (errors.length > 0) {
          const message =
            'Validation error(s): ' +
            errors.map(error => Object.values(error.constraints)).join(', ');
          next(Boom.badRequest(message));
        } else {
          next();
        }
      });
    };
  }

  public validateUrl<T>(type: any): express.RequestHandler {
    return (req, res, next) => {
      validate(plainToClass(type, req.params)).then(errors => {
        if (errors.length > 0) {
          const message =
            'Validation error(s): ' +
            errors.map(error => Object.values(error.constraints)).join(', ');
          next(Boom.badRequest(message));
        } else {
          next();
        }
      });
    };
  }
}

export default ValidationMiddleware;
