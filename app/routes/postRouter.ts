'use strict';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import ErrorHandler from '../middleware/errorhandler';
import { Post } from '../orm/entities/Post';

//Router to route /posts-route
class PostRouter {
  private postRepo: Repository<Post>;
  constructor(opts) {
    this.postRepo = opts.postRepo;
  }

  //get all posts from database
  public getAll = async (res: Response, next: NextFunction) => {
    try {
      let results = await this.postRepo.find();
      res.status(200).send(results);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Couldn't get the data", Error: error });
    }
  };
  //get specific post from database
  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    let post = new Post();
    const id = req.params.id;
    try {
      post = await this.postRepo.findOne(id);
      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Couldn't get the data", error: error });
    }
  };
  //Add new post to database
  public create = async (req: Request, res: Response, next: NextFunction) => {
    let post = new Post();
    post.topic = req.body.topic;
    post.post = req.body.post;
    post.datetime = new Date(Date.now());
    const category = req.body.categoryId;
    post.pinned = req.body.pinned;

    let postRepository = this.postRepo;
    try {
      await postRepository.save(post);

      res.status(200).send(post);
    } catch (error) {
      res.status(400).send({ message: "Couldn't save the data", Error: error.message });
    }
  };
  //Modify a post in database
  public update = async (req: Request, res: Response, next: NextFunction) => {
    let post = new Post();
    post.topic = req.body.topic;
    post.post = req.body.post;
    post.modified = new Date(Date.now());
    const category = req.body.categoryId;
    post.pinned = req.body.pinned;

    let postRepository = this.postRepo;
    try {
      await postRepository.save(post);

      res.status(200).send(post);
    } catch (error) {
      res.status(400).send({ message: "Couldn't save the data", Error: error.message });
    }
  };
  //Delete a post from database
  public delete(req: Request, res: Response, next: NextFunction) {
    res.send('Nothing');
  }
}

export default PostRouter;
