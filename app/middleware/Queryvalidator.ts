import { NextFunction, Request, Response } from 'express';
import { Post } from '../orm/entities/Post';
import { Validator, validate, ValidationError } from 'class-validator';
import { Category } from '../orm/entities/Category';
import { User } from '../orm/entities/User';
import { Reply } from '../orm/entities/Reply';
import { LikeOnPost } from '../orm/entities/LikeOnPost';
import { LikeOnReply } from '../orm/entities/LikeOnReply';
import ErrorHandler from './errorhandler';

class QueryValidator {
  ehandler: ErrorHandler;
  constructor(opts) {
    this.ehandler = opts.errorhandler;
  }

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    let errors;
    let post = new Post();
    post.id = req.body.id;
    post.topic = req.body.topic;
    post.post = req.body.post;
    post.pinned = req.body.pinned;
    post.category = req.body.category;

    try {
      let validateErrors: ValidationError[] = await validate(post);

      if (validateErrors.length > 0) {
        errors = this.ehandler.handleValidationErrors(validateErrors);
        throw 400;
      }
      next();
    } catch {
      res.status(400).send(errors);
    }
  };
  public id = async (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator();
    const id = req.params.id;
    try {
      validator.isInt(id);
      validator.isPositive(id);
      next();
    } catch {
      res.status(400).send({ type: 'Validation error', 'invalid-param': 'Not valid Id' });
    }
  };
  public createCategory = async (req: Request, res: Response, next: NextFunction) => {
    let errors;

    const category = new Category();
    category.name = req.body.name;
    category.description = req.body.description;
    try {
      let validateErrors: ValidationError[] = await validate(category);

      if (validateErrors.length > 0) {
        errors = this.ehandler.handleValidationErrors(validateErrors);
        throw 400;
      }
      next();
    } catch {
      res.status(400).send(errors);
    }
  };
  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    let errors;
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.avatar = req.body.avatar;
    try {
      let validateErrors: ValidationError[] = await validate(user);

      if (validateErrors.length > 0) {
        errors = this.ehandler.handleValidationErrors(validateErrors);
        throw 400;
      }
      next();
    } catch {
      res.status(400).send(errors);
    }
  };
  public createReply = async (req: Request, res: Response, next: NextFunction) => {
    let errors;
    const reply = new Reply();
    reply.reply = req.body.reply;
    reply.post = req.body.post;
    reply.replyto = req.body.replyto;
    reply.user = req.body.user;
    try {
      let validateErrors: ValidationError[] = await validate(reply);

      if (validateErrors.length > 0) {
        errors = this.ehandler.handleValidationErrors(validateErrors);
        throw 400;
      }
      next();
    } catch {
      res.status(400).send(errors);
    }
  };
  public createLikeonPost = async (req: Request, res: Response, next: NextFunction) => {
    let errors;
    const likeonPost = new LikeOnPost();
    likeonPost.like = req.body.like;
    likeonPost.post = req.body.post;
    likeonPost.user = req.body.user;
    try {
      let validateErrors: ValidationError[] = await validate(likeonPost);

      if (validateErrors.length > 0) {
        errors = this.ehandler.handleValidationErrors(validateErrors);
        throw 400;
      }
      next();
    } catch {
      res.status(400).send(errors);
    }
  };
  public createLikeonReply = async (req: Request, res: Response, next: NextFunction) => {
    let errors;
    const likeonReply = new LikeOnReply();
    likeonReply.like = req.body.like;
    likeonReply.reply = req.body.post;
    likeonReply.user = req.body.user;
    try {
      let validateErrors: ValidationError[] = await validate(likeonReply);

      if (validateErrors.length > 0) {
        errors = this.ehandler.handleValidationErrors(validateErrors);
        throw 400;
      }
      next();
    } catch {
      res.status(400).send(errors);
    }
  };
}
export default QueryValidator;
