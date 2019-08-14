import { Router, Request, Response, NextFunction } from 'express';
import { Dependencies } from '../Types';
import Boom from 'boom';
import CategoryController from '../controllers/CategoryController';
import PostController from '../controllers/PostController';
import ValidatorMiddleware from '../middleware/ValidationMiddleware';
import CreatePostDto from '../dto/CreatePost';
import UpdatePostDto from '../dto/CreatePost';
import CreateCategoryDto from '../dto/CreateCategory';
import UpdateCategoryDto from '../dto/UpdateCategory';
import IdDto from '../dto/Id';

class Index {
  router: Router;
  private postController: PostController;
  private categoryController: CategoryController;
  private validator: ValidatorMiddleware;

  constructor(opts: Dependencies) {
    this.postController = opts.postController;
    this.categoryController = opts.categoryController;
    this.validator = opts.validator;
    this.router = Router();
    this.init();
  }

  public rootPath(req: Request, res: Response, next: NextFunction) {
    res.status(200).send({ message: 'Server is up and running' });
  }

  public notFound(req: Request, res: Response, next: NextFunction) {
    next(Boom.notFound('Path not found'));
  }
  private routePosts() {
    this.router.post(
      '/api/v1/posts',
      this.validator.validateBody(CreatePostDto),
      this.postController.create
    );
    this.router.get('/api/v1/posts', this.postController.getAll);
    this.router
      .route('/api/v1/posts/:id')
      .get(this.validator.validateUrl(IdDto), this.postController.getOne)
      .put(
        this.validator.validateUrl(IdDto),
        this.validator.validateBody(UpdatePostDto),
        this.postController.update
      )
      .delete(this.validator.validateUrl(IdDto), this.postController.delete);
  }
  private routeCategories() {
    this.router.post(
      '/api/v1/categories',
      this.validator.validateBody(CreateCategoryDto),
      this.categoryController.create
    );
    this.router.get('/api/v1/categories', this.categoryController.getAll);

    this.router
      .route('/api/v1/categories/:id')
      .get(this.validator.validateUrl(IdDto), this.categoryController.getOne)
      .put(
        this.validator.validateUrl(IdDto),
        this.validator.validateBody(UpdateCategoryDto),
        this.categoryController.update
      )
      .delete(this.validator.validateUrl(IdDto), this.categoryController.delete);
  }

  init() {
    this.router.get('/', this.rootPath);
    this.routePosts();
    this.routeCategories();
    this.router.all('*', this.notFound);
  }
}
export default Index;
