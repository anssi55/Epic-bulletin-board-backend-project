import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Post from '../orm/entities/Post';
import Boom from 'boom';

class PostRouter {
  private postRepo: Repository<Post>;
  private categoryRepo: Repository<Category>;
  constructor(opts: Dependencies) {
    this.postRepo = opts.postRepo;
    this.categoryRepo = opts.categoryRepo;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postRepo.find();
      if (posts.length > 0) {
        res.status(200).send(posts);
      } else {
        next(Boom.notFound('Post not found'));
      }
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.findOne(id);
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
    let post = new Post();
    post.topic = req.body.topic;
    post.post = req.body.post;
    post.datetime = new Date(Date.now());
    let categoryId = req.body.categoryId;
    post.pinned = req.body.pinned;
    try {
      const category = await this.categoryRepo.findOne(categoryId);
      if (category) {
        post.category = category;
        const result = await this.postRepo.save(post);
        res.status(200).send(result);
      } else {
        next(Boom.notFound('Category not found'));
      }
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const categoryId = req.body.categoryId;

    try {
      const post = await this.postRepo.findOne(id);
      const category = await this.categoryRepo.findOne(categoryId);
      if (post) {
        post.topic = req.body.topic;
        post.post = req.body.post;
        post.modified = new Date(Date.now());
        post.pinned = req.body.pinned;
        if (category) {
          post.category = category;
        } else {
          next(Boom.notFound('Category not found'));
        }
        const result = await this.postRepo.save(post);
        res.status(200).send(result);
      } else {
        next(Boom.notFound('Post not found'));
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.findOne(id);
      if (post) {
        await this.postRepo.delete(post);
        res.status(200).send('Deleted post:' + JSON.stringify(post));
      } else {
        next(Boom.notFound('Post not found'));
      }
      res.status(200).send(post);
    } catch (error) {
      next(error);
    }
  };
}

export default PostRouter;
