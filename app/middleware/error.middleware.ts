import { NextFunction, Request, Response } from 'express';
import Boom from 'boom';
function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error.name === 'SyntaxError') {
    res.status(400).send(Boom.badRequest().output.payload);
  } else {
    Boom.badRequest;
    const boom = Boom.boomify(error).output;
    res.status(boom.statusCode).send(boom.payload);
  }
}

export default errorMiddleware;
