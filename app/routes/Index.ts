import { Router, Request, Response, NextFunction } from 'express';
import { Dependencies } from '../Types';
import Boom from 'boom';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
import CategoryRouter from './CategoryRouter';
import PostRouter from './PostRouter';
import bodyValidator from '../middleware/validation.middleware';
import CreatePostDto from '../dto/CreatePost';
import CategoriesRouter from './CategoryRouter';
import CreateCategoryDto from '../dto/CreateCategory';
import UpdateCategoryDto from '../dto/UpdateCategory';

// class to route all the REST-api paths

class Index {
  router: Router;
  private postRouter: PostRouter;
  private bodyValidator: typeof bodyValidator;
  private categoryRouter: CategoryRouter;
  constructor(opts: Dependencies) {
    this.postRouter = opts.postRouter;
    this.categoryRouter = opts.categoryRouter;
    this.bodyValidator = opts.bodyValidator;
    this.router = Router();
    this.init();
  }

  // Root path response
  public rootPath(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({ message: 'Server is up and running' });
  }

  // Catching api-calls with bad address
  public notFound(req: Request, res: Response, next: NextFunction) {
    res.status(404).send(Boom.notFound('Path not found').output.payload);
  }
  private routePost() {
    this.router.post('/api/v1/post', this.bodyValidator(CreatePostDto), this.postRouter.create);
    this.router.get('/api/v1/post', this.postRouter.getAll);
    this.router
      .route('/api/v1/post/:id')
      .get(this.postRouter.getOne)
      .put(this.postRouter.update)
      .delete(this.postRouter.delete);
  }
  private routeCategory() {
    this.router.post(
      '/api/v1/category',
      this.bodyValidator(CreateCategoryDto),
      this.categoryRouter.create
    );
    this.router.get('/api/v1/category', this.categoryRouter.getAll);

    this.router
      .route('/api/v1/category/:id')
      .get(this.categoryRouter.getOne)
      .put(this.bodyValidator(UpdateCategoryDto), this.categoryRouter.update)
      .delete(this.categoryRouter.delete);
  }

  //Routing all the addresses to right path
  init() {
    this.router.get('/', this.rootPath);
    this.routePost();
    this.routeCategory();
    // this.router.use('/api/v1/replies', repliesRouter);
    // this.router.use('/api/v1/auth', authRouter);
    // this.router.use('/api/v1/users', usersRouter);
    this.router.all('*', this.notFound);
  }
}
export default Index;
