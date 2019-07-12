'use strict';
import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Dependencies } from '../Types';
import Category from '../orm/entities/Category';
import Post from '../orm/entities/Post';

class PostRouter {
  private postRepo: Repository<Post>;
  private categoryRepo: Repository<Category>;
  constructor(opts: Dependencies) {
    this.postRepo = opts.postRepo;
    this.categoryRepo = opts.categoryRepo;
  }

  //get all posts from database
  public getAll = async (res: Response, next: NextFunction) => {
    try {
      let posts = await this.postRepo.find();
      res.status(200).send(posts);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Couldn't get the data", Error: error });
    }
  };
  //get specific post from database
  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.findOne(id);
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
    const categoryId = req.body.categoryId;
    post.pinned = req.body.pinned;

    let postRepository = this.postRepo;
    try {
      const category = await this.categoryRepo.findOne(categoryId);
      if (category !== undefined) {
        post.category = category;
        await this.postRepo.save(post);
        res.status(200).send(post);
      } else {
        throw 400;
      }
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
    const categoryId = req.body.categoryId;
    post.pinned = req.body.pinned;
    try {
      const category = await this.categoryRepo.findOne(categoryId);
      if (category !== undefined) {
        post.category = category;
        await this.postRepo.save(post);
        res.status(200).send(post);
      } else {
        throw 400;
      }
    } catch (error) {
      res.status(400).send({ message: "Couldn't save the data", Error: error.message });
    }
  };
  //Delete a post from database
  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await this.postRepo.delete(id);
      res.status(200).send(post);
    } catch (error) {
      console.log(error);
      res.status(400).send({ message: "Couldn't delete the data", error: error });
    }
  };
}

export default PostRouter;
