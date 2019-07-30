import { Repository } from 'typeorm';
import Post from '../orm/entities/Post';
import Category from '../orm/entities/Category';
import { Dependencies } from '../Types';
import Boom from 'boom';

class PostModel {
  private postRepo: Repository<Post>;
  private categoryRepo: Repository<Category>;
  constructor(opts: Dependencies) {
    this.postRepo = opts.postRepo;
    this.categoryRepo = opts.categoryRepo;
  }

  public getAllPosts = async () => {
    try {
      const posts = await this.postRepo.find();
      if (posts.length > 0) {
        return posts;
      } else {
        throw Boom.notFound('Post not found');
      }
    } catch {
      return Boom.serverUnavailable('Something wrong with the database connection');
    }
  };
  public getOnePost = async (postId: number) => {
    try {
      const post = await this.postRepo.findOne(postId);
      if (post) {
        return post;
      } else {
        throw Boom.notFound('Post not found');
      }
    } catch {
      return Boom.serverUnavailable('Something wrong with the database connection');
    }
  };
  public savePost = async (post: Post, categoryId: number) => {
    post.datetime = new Date(Date.now());
    try {
      const category = await this.categoryRepo.findOne(categoryId);
      if (category) {
        post.category = category;
        const result = await this.postRepo.save(post);
        return result;
      } else {
        return Boom.notFound('Category not found');
      }
    } catch {
      return Boom.serverUnavailable('Something wrong with the database connection');
    }
  };
}
