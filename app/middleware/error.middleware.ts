import { NextFunction, Request, Response } from 'express';
import Boom from 'boom';

function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if (Boom.isBoom(error)) {
    res.status(error.output.statusCode).send(error.output.payload);
  } else {
    const boom = Boom.boomify(error).output;
    res.status(boom.statusCode).send(boom.payload);
  }
}

export default errorMiddleware;
