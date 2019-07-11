import { Router, Request, Response, NextFunction } from 'express';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
import categoriesRouter from './CategoryRouter';
import PostRouter from './postRouter';
import QueryValidator from '../middleware/QueryValidator';
import Category from '../orm/entities/Category';
import { validate, ValidationError } from 'class-validator';
import Post from '../orm/entities/Post';
import ErrorHandler from '../middleware/errorhandler';
import { Dependencies } from '../Types';

// class to route all the REST-api paths

class Index {
  router: Router;
  postsRouter: PostRouter;
  validator: QueryValidator;

  constructor(opts: Dependencies) {
    this.postsRouter = opts.postRouter;
    this.validator = opts.queryValidator;
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
    this.router.post('/api/v1/posts', [this.validator.createPost], this.postsRouter.create);
    //.get(this.postsRouter.getAll)

    this.router
      .route('/api/v1/posts/:id')
      .get(this.postsRouter.getOne)
      .put(this.postsRouter.update)
      .delete(this.postsRouter.delete);
  }

  //Routing all the addresses to right path
  init() {
    this.router.get('/', this.rootPath);
    this.routePosts();
    this.router.use('/api/v1/categories', categoriesRouter);
    // this.router.use('/api/v1/replies', repliesRouter);
    // this.router.use('/api/v1/auth', authRouter);
    // this.router.use('/api/v1/users', usersRouter);
    this.router.all('*', this.notFound);
  }
}
export default Index;
