import Index from './routes/Index';
import PostsRouter from './routes/PostsRouter';
import Post from './orm/entities/Post';
import { Repository } from 'typeorm';

export type Dependencies = {
  index: Index;
  postsController: PostsRouter;
  postRepo: Repository<Post>;
};
