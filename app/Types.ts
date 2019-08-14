import Index from './routers/Index';
import PostController from './controllers/PostController';
import CategoryController from './controllers/CategoryController';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import Category from './orm/entities/Category';
import ValidationMiddleWare from './middleware/ValidationMiddleware';
import errorMiddleware from './middleware/error.middleware';
import EnvVariables from './dto/EnvVariables';
import PostModel from './models/PostModel';
import CategoryModel from './models/CategoryModel';
import User from './orm/entities/User';

export type Dependencies = {
  index: Index;
  postController: PostController;
  categoryController: CategoryController;
  postRepo: Repository<Post>;
  categoryRepo: Repository<Category>;
  userRepo: Repository<User>;
  errorMiddleware: typeof errorMiddleware;
  envVariables: EnvVariables;
  postModel: PostModel;
  categoryModel: CategoryModel;
  validator: ValidationMiddleWare;
};
