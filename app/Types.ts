import Index from './routes/Indexs';
import PostRouter from './routes/PostRouters';
import CategoryRouter from './routes/CategoryRouters';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import Category from './orm/entities/Category';
import validationMiddleWare from './middleware/validation.middleware';
import errorMiddleware from './middleware/error.middleware';

export type Dependencies = {
  index: Index;
  postRouter: PostRouter;
  categoryRouter: CategoryRouter;
  postRepo: Repository<Post>;
  categoryRepo: Repository<Category>;
  bodyValidator: typeof validationMiddleWare;
  errorMiddleware: typeof errorMiddleware;
};
