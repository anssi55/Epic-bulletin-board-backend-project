import { Router, Request, Response, NextFunction } from 'express';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
import CategoryRouter from './CategoryRouter';
import PostRouter from './postRouter';
import { Dependencies } from '../Types';
import validate from '../middleware/validation.middleware';
import CreatePostDto from '../dto/createPost';
import CategoriesRouter from './CategoryRouter';
import CreateCategoryDto from '../dto/CreateCategory';
import UpdateCategoryDto from '../dto/UpdateCategory';

// class to route all the REST-api paths

class Index {
  router: Router;
  postRouter: PostRouter;
  validator: typeof validate;
  categoryRouter: CategoryRouter;
  constructor(opts: Dependencies) {
    this.postRouter = opts.postRouter;
    this.categoryRouter = opts.categoryRouter;
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
  private routePosts() {
    this.router.post('/api/v1/posts', this.validator(CreatePostDto), this.postRouter.create);
    this.router.get('/api/v1/posts', this.postRouter.getAll);
    this.router
      .route('/api/v1/posts/:id')
      .get(this.postRouter.getOne)
      .put(this.postRouter.update)
      .delete(this.postRouter.delete);
  }
  private routeCategory() {
    this.router.post(
      '/api/v1/posts',
      this.validator(CreateCategoryDto),
      this.categoryRouter.create
    );
    this.router.get('/api/v1/posts', this.categoryRouter.getAll);

    this.router
      .route('/api/v1/posts/:id')
      .get(this.categoryRouter.getOne)
      .put(this.validator(UpdateCategoryDto), this.categoryRouter.update)
      .delete(this.categoryRouter.delete);
  }

  //Routing all the addresses to right path
  init() {
    this.router.get('/', this.rootPath);
    this.routePosts();
    this.routeCategory();
    // this.router.use('/api/v1/replies', repliesRouter);
    // this.router.use('/api/v1/auth', authRouter);
    // this.router.use('/api/v1/users', usersRouter);
    this.router.all('*', this.notFound);
  }
}
export default Index;
