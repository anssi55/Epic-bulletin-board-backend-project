import { Repository } from 'typeorm';
import User from '../orm/entities/User';
import { Dependencies } from '../Types';
import Boom from 'boom';

class UserService {
  private userRepo: Repository<User>;

  constructor(opts: Dependencies) {
    this.userRepo = opts.userRepo;
  }

  public getAllUsers = async () => {
    try {
      const users = await this.userRepo.find();
      if (users.length > 0) {
        return users;
      } else {
        throw Boom.notFound('Users not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection' + error);
    }
  };

  public getOneUser = async (userId: number) => {
    try {
      const user = await this.userRepo.findOne(userId);
      if (user) {
        return user;
      } else {
        throw Boom.notFound('User not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public createUser = async (newUser: User) => {
    newUser.created = new Date(Date.now());
    try {
      return await this.userRepo.save(newUser);
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public modifyUser = async (modifiedUser: User, userId: number) => {
    try {
      await this.userRepo.update(userId, modifiedUser);
      let user = await this.userRepo.findOne(modifiedUser.id);
      if (user) {
        return user;
      } else {
        throw Boom.notFound('User not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public deleteUser = async (userId: number) => {
    try {
      const user = await this.userRepo.findOne(userId);
      if (user) {
        return await this.userRepo.remove(user);
      } else {
        throw Boom.notFound('User not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };
}
export default UserService;
