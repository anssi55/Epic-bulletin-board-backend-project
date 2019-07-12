import Index from './routes/Index';
import PostsRouter from './routes/PostRouter';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import ErrorHandler from './middleware/errorhandler';
import QueryValidator from './middleware/QueryValidator';
import Category from './orm/entities/Category';

export type Dependencies = {
  index: Index;
  postRouter: PostsRouter;
  postRepo: Repository<Post>;
  errorHandler: ErrorHandler;
  queryValidator: QueryValidator;
  categoryRepo: Repository<Category>;
};
