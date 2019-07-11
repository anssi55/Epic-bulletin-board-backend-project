import Index from './routes/Index';
import PostsRouter from './routes/PostRouter';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import ErrorHandler from './middleware/errorhandler';

export type Dependencies = {
  index: Index;
  postRouter: PostsRouter;
  postRepo: Repository<Post>;
  errorHandler: ErrorHandler;
};
