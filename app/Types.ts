import Index from './routers/Index';
import PostController from './controllers/PostController';
import CategoryController from './controllers/CategoryController';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import Category from './orm/entities/Category';
import validationMiddleWare from './middleware/validation.middleware';
import errorMiddleware from './middleware/error.middleware';
import EnvVariables from './dto/EnvVariables';
import PostModel from './models/PostModel';
import CategoryModel from './models/CategoryModel';

export type Dependencies = {
  index: Index;
  postController: PostController;
  categoryController: CategoryController;
  postRepo: Repository<Post>;
  categoryRepo: Repository<Category>;
  bodyValidator: typeof validationMiddleWare;
  errorMiddleware: typeof errorMiddleware;
  envVariables: EnvVariables;
  postModel: PostModel;
  categoryModel: CategoryModel;
};
