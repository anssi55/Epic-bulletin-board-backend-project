import Index from './routes/Index';
import PostRouter from './routes/PostRouter';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';
import Category from './orm/entities/Category';
import validationMiddleWare from './middleware/validation.middleware';
export type Dependencies = {
  index: Index;
  postRouter: PostRouter;
  postRepo: Repository<Post>;
  categoryRepo: Repository<Category>;
  validator: typeof validationMiddleWare;
};
