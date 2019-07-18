import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Post from '../orm/entities/Post';
import NotFoundException from '../exceptions/NotFoundException';
import CouldNotSaveException from '../exceptions/CouldNotSaveException';

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
      let posts = await this.postRepo.find();
      res.status(200).send(posts);
    } catch {
      next(new NotFoundException('Post', 'any'));
    }
  };
  //get specific post from database
  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.findOne(id);
      res.status(200).send(post);
    } catch (error) {
      next(new CouldNotSaveException());
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
    } catch {
      next(new CouldNotSaveException());
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
