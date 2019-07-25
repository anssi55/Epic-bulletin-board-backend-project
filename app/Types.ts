import Index from './routes/Index';
import PostRouter from './routes/PostRouter';
import CategoryRouter from './routes/CategoryRouter';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import Category from './orm/entities/Category';
import validationMiddleWare from './middleware/validation.middleware';
import errorMiddleware from './middleware/error.middleware';
import EnvVariables from './dto/EnvVariables';

export type Dependencies = {
  index: Index;
  postRouter: PostRouter;
  categoryRouter: CategoryRouter;
  postRepo: Repository<Post>;
  categoryRepo: Repository<Category>;
  bodyValidator: typeof validationMiddleWare;
  errorMiddleware: typeof errorMiddleware;
  envVariables: EnvVariables;
};
