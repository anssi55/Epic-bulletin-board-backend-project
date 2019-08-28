import { NextFunction, Request, Response } from 'express';
import { Dependencies } from '../Types';
import User from '../orm/entities/User';
import UserService from '../services/UserService';
import { plainToClass } from 'class-transformer';

class UserController {
  private userService: UserService;
  constructor(opts: Dependencies) {
    this.userService = opts.userService;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);
    try {
      const user = await this.userService.getOneUser(userId);
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const userToCreate = plainToClass(User, req.body, { excludeExtraneousValues: true });
    try {
      const result = await this.userService.createUser(userToCreate);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const modifiedUser = plainToClass(User, req.body, { excludeExtraneousValues: true });
    const userId = parseInt(req.params.id);
    try {
      const result = await this.userService.modifyUser(modifiedUser, userId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id);
    try {
      const result = await this.userService.deleteUser(userId);
      if (result) {
        res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
