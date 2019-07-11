'use strict';
import { Router, Request, Response, NextFunction, response } from 'express';

class AuthRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

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
  init() {
    this.router.post('/login', this.login);
    this.router.post('/logout', this.logout);
    this.router.post('/forgotPW', this.forgotPassword);
    this.router.delete('/delete', this.delete);
  }
}

const authRouter = new AuthRouter();
authRouter.init();

export default AuthRouter;
