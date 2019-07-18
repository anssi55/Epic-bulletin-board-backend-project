'use strict';
import { Request, Response, NextFunction } from 'express';

class AuthRouter {
  constructor() {}

  public login(req: Request, res: Response, next: NextFunction) {
    res.send('not implemented');
  }

  public logout(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
  public register(req: Request, res: Response, next: NextFunction) {}
  public forgotPassword(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
  public delete(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
}

export default AuthRouter;
