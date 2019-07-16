import { Router, Request, Response, NextFunction } from 'express';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
import categoriesRouter from './CategoryRouter';
import PostRouter from './postRouter';
import { Dependencies } from '../Types';
import validate from '../middleware/validation.middleware';
import CreatePostDto from '../dto/createPost';

// class to route all the REST-api paths

class Index {
  router: Router;
  postRouter: PostRouter;
  validator: typeof validate;
  constructor(opts: Dependencies) {
    this.postRouter = opts.postRouter;
    this.validator = opts.validator;
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
    this.router.post('/api/v1/posts', this.validator(CreatePostDto), this.postRouter.create);
    this.router.get('/api/v1/posts', this.postRouter.getAll);
    //.get(this.postsRouter.getAll)

    this.router
      .route('/api/v1/posts/:id')
      .get(this.postRouter.getOne)
      .put(this.postRouter.update)
      .delete(this.postRouter.delete);
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
