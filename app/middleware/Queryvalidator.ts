import { NextFunction, Request, Response } from 'express';
import { Post } from '../orm/entities/Post';
import { Validator, validate, ValidationError } from 'class-validator';
import { Category } from '../orm/entities/Category';
import { User } from '../orm/entities/User';
import { Reply } from '../orm/entities/Reply';
import { LikeOnPost } from '../orm/entities/LikeOnPost';
import { LikeOnReply } from '../orm/entities/LikeOnReply';

export class QueryValidator {
  public async createPost(req: Request, res: Response, next: NextFunction) {
    let post = new Post();
    post.id = req.body.id;
    post.topic = req.body.topic;
    post.post = req.body.post;
    post.pinned = req.body.pinned;
    post.category = req.body.category;

    try {
      await validate(post);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async id(req: Request, res: Response, next: NextFunction) {
    const validator = new Validator();
    const id = req.params.id;
    try {
      validator.isInt(id);
      validator.isPositive(id);
      next();
    } catch {
      res.status(400).send({ topic: 'Validation error', message: 'Not valid Id' });
    }
  }
  public async createCategory(req: Request, res: Response, next: NextFunction) {
    const category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;
    try {
      await validate(category);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createUser(req: Request, res: Response, next: NextFunction) {
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.avatar = req.body.avatar;
    try {
      await validate(user);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createReply(req: Request, res: Response, next: NextFunction) {
    const reply = new Reply();
    reply.reply = req.body.reply;
    reply.post = req.body.post;
    reply.replyto = req.body.replyto;
    reply.user = req.body.user;
    try {
      await validate(reply);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createLikeonPost(req: Request, res: Response, next: NextFunction) {
    const likeonPost = new LikeOnPost();
    likeonPost.like = req.body.like;
    likeonPost.post = req.body.post;
    likeonPost.user = req.body.user;
    try {
      await validate(likeonPost);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }
  public async createLikeonReply(req: Request, res: Response, next: NextFunction) {
    const likeonReply = new LikeOnReply();
    likeonReply.like = req.body.like;
    likeonReply.reply = req.body.post;
    likeonReply.user = req.body.user;
    try {
      await validate(likeonReply);
      next();
    } catch (error) {
      res.status(400).send(error);
    }
  }

}
