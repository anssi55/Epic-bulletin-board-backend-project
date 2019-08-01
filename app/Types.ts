import Index from './routers/Index';
import PostController from './controllers/PostController';
import CategoryController from './controllers/CategoryController';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import Category from './orm/entities/Category';
import BodyvalidationMiddleWare from './middleware/bodyValidation.middleware';
import UrlValidationMiddleWare from './middleware/urlValidation.middleware';
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
  bodyValidator: typeof BodyvalidationMiddleWare;
  errorMiddleware: typeof errorMiddleware;
  envVariables: EnvVariables;
  postModel: PostModel;
  categoryModel: CategoryModel;
  urlValidator: typeof UrlValidationMiddleWare;
};
