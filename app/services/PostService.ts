import { Repository } from 'typeorm';
import Post from '../orm/entities/Post';
import Category from '../orm/entities/Category';
import { Dependencies } from '../Types';
import Boom from 'boom';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

class PostService {
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
        throw Boom.notFound('Posts not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection' + error);
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
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public createPost = async (newPost: Post, categoryId: number) => {
    newPost.created = new Date(Date.now());
    try {
      const category = await this.categoryRepo.findOne(categoryId);
      if (category) {
        newPost.category = category;
        return await this.postRepo.save(newPost);
      } else {
        throw Boom.notFound('Category not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public modifyPost = async (modifiedPost: QueryDeepPartialEntity<Post>, postId: number) => {
    try {
      modifiedPost.modified = new Date(Date.now());
      await this.postRepo.update(postId, modifiedPost);
      const post = await this.postRepo.findOne(postId);
      if (post) {
        return post;
      } else {
        throw Boom.notFound('Post not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };

  public deletePost = async (postId: number) => {
    try {
      const post = await this.postRepo.findOne(postId);
      if (post) {
        return await this.postRepo.remove(post);
      } else {
        throw Boom.notFound('Post not found');
      }
    } catch (error) {
      throw Boom.isBoom(error)
        ? error
        : Boom.badImplementation('Something wrong with the database connection');
    }
  };
}
export default PostService;
