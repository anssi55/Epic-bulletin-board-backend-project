import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Post from '../orm/entities/Post';
import NotFoundException from '../exceptions/NotFoundException';
import CouldNotSaveException from '../exceptions/CouldNotSaveException';
import Boom, { boomify } from 'boom';

class PostRouter {
  private postRepo: Repository<Post>;
  private categoryRepo: Repository<Category>;
  constructor(opts: Dependencies) {
    this.postRepo = opts.postRepo;
    this.categoryRepo = opts.categoryRepo;
  }

  //get all posts from database
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postRepo.find();
      if (posts.length > 0) {
        res.status(200).send(posts);
      } else {
        res.status(404).send(Boom.notFound('Posts not found'));
      }
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };
  //get specific post from database
  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.findOne(id);
      if (post) {
        res.status(200).send(post);
      } else {
        res.status(404).send(Boom.notFound('Post not found').output.payload);
      }
    } catch (error) {
      const boom = Boom.boomify(error).output;
      res.status(boom.statusCode).send(boom.payload);
    }
  };
  //Add new post to database
  public create = async (req: Request, res: Response, next: NextFunction) => {
    let post = new Post();
    post.topic = req.body.topic;
    post.post = req.body.post;
    post.datetime = new Date(Date.now());
    post.category = req.body.categoryId;
    post.pinned = req.body.pinned;
    try {
      await this.postRepo.save(post);
      res.status(200).send(post);
    } catch (error) {
      const boom = Boom.boomify(error);
      res.status(boom.output.statusCode).send(boom.output.payload);
    }
  };
  //Modify a post in database
  public update = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const categoryId = req.body.categoryId;

    try {
      const post = await this.postRepo.findOne(id);
      const category = await this.categoryRepo.findOne(categoryId);
      if (post !== undefined) {
        post.topic = req.body.topic;
        post.post = req.body.post;
        post.modified = new Date(Date.now());
        post.pinned = req.body.pinned;
        if (category !== undefined) {
          post.category = category;
        }
        await this.postRepo.save(post);
        res.status(200).send(post);
      }
    } catch {
      next(new NotFoundException('Post', req.params.id));
    }
  };
  //Delete a post from database
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.delete(id);
      res.status(200).send(post);
    } catch {
      next(new NotFoundException('Post', req.params.id));
    }
  };
}

export default PostRouter;
