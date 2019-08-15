import { NextFunction, Request, Response } from 'express';
import { Dependencies } from '../Types';
import Post from '../orm/entities/Post';
import PostService from '../services/PostService';
import { plainToClass } from 'class-transformer';

class PostController {
  private postModel: PostService;
  constructor(opts: Dependencies) {
    this.postModel = opts.postService;
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
    const postId = req.params.id;
    try {
      const post = await this.postModel.getOnePost(postId);
      res.status(200).send(post);
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
      if (result) {
        res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default PostController;
