import { NextFunction, Request, Response } from 'express';
import { Dependencies } from '../Types';
import Post from '../orm/entities/Post';
import PostService from '../services/PostService';
import { plainToClass } from 'class-transformer';

class PostController {
  private postService: PostService;
  constructor(opts: Dependencies) {
    this.postService = opts.postService;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getAllPosts();
      res.status(200).send(posts);
    } catch (error) {
      next(error);
    }
  };

  public getOne = async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.id);
    try {
      const post = await this.postService.getOnePost(postId);
      res.status(200).send(post);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    const postToCreate = plainToClass(Post, req.body, { excludeExtraneousValues: true });
    const categoryId = req.body.categoryId;

    try {
      const result = await this.postService.createPost(postToCreate, categoryId);
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    const modifiedPost = plainToClass(Post, req.body, { excludeExtraneousValues: true });
    try {
      const result = await this.postService.modifyPost(modifiedPost, parseInt(req.params.id));
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.id);
    try {
      const result = await this.postService.deletePost(postId);
      if (result) {
        res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
