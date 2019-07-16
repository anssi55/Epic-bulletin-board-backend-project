import Index from './routes/Index';
import PostRouter from './routes/PostRouter';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import ErrorHandler from './middleware/errorhandler';

import Category from './orm/entities/Category';

export type Dependencies = {
  index: Index;
  postRouter: PostRouter;
  postRepo: Repository<Post>;
  errorHandler: ErrorHandler;
  categoryRepo: Repository<Category>;
};
