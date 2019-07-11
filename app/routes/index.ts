'use strict';
import { Router, Request, Response, NextFunction } from 'express';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
//import CategoriesRouter from './categoriesRouter';
import PostsRouter from './PostsRouter';
import { Dependencies } from '../Types';

// class to route all the REST-api paths

class Index {
  router: Router;
  postsController: PostsRouter;
  constructor(opts: Dependencies) {
    this.postsController = opts.postsController;
    this.router = Router();
    this.init();
  }

  // Root path response
  public rootPath(req: Request, res: Response, next: NextFunction) {
    res.send({ message: 'Server is up and running' });
  }

  // Catching api-calls with bad address
  public notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).send({ message: 'Path not found' });
  }
  public routePosts() {
    this.router
      .route('/api/v1/posts')
      .get(this.postsController.getAll)
      .post(this.postsController.create);
    this.router
      .route('/api/v1/posts/:id')
      .get(this.postsController.getOne)
      .put(this.postsController.update)
      .delete(this.postsController.delete);
  }

  //Routing all the addresses to right path
  init() {
    this.router.get('/', this.rootPath);
    this.routePosts();
    //this.router.use('/api/v1/categories', CategoriesRouter.);
    // this.router.use('/api/v1/replies', repliesRouter);
    // this.router.use('/api/v1/auth', authRouter);
    // this.router.use('/api/v1/users', usersRouter);
    this.router.all('*', this.notFound);
  }
}
export default Index;
