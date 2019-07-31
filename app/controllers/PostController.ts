import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Post from '../orm/entities/Post';
import Boom from 'boom';
import PostModel from '../models/PostModel';
import { plainToClass } from 'class-transformer';

class PostController {
  private postRepo: Repository<Post>;
  private categoryRepo: Repository<Category>;
  private postModel: PostModel;
  constructor(opts: Dependencies) {
    this.postRepo = opts.postRepo;
    this.categoryRepo = opts.categoryRepo;
    this.postModel = opts.postModel;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postModel.getAllPosts();
      res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const PostId = req.params.id;
    try {
      const post = await this.postRepo.findOne(PostId);
      if (post) {
        res.status(200).send(post);
      } else {
        next(Boom.notFound('Post not found'));
      }
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const postToCreate = plainToClass(Post, req.body, { excludeExtraneousValues: true });
    const categoryId = req.body.categoryId;

    try {
      const result = await this.postModel.createPost(postToCreate, categoryId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const modifiedPost = plainToClass(Post, req.body, { excludeExtraneousValues: true });
    modifiedPost.id = req.params.id;
    const categoryId = req.body.categoryId;

    try {
      const result = await this.postModel.modifyPost(modifiedPost, categoryId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;

    try {
      const result = await this.postModel.deletePost(postId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
