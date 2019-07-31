import { Router, Request, Response, NextFunction } from 'express';
import { Dependencies } from '../Types';
import Boom from 'boom';
import CategoryController from '../controllers/CategoryController';
import PostController from '../controllers/PostController';
import bodyValidator from '../middleware/validation.middleware';
import CreatePostDto from '../dto/CreatePost';
import CreateCategoryDto from '../dto/CreateCategory';
import UpdateCategoryDto from '../dto/UpdateCategory';

class Index {
  router: Router;
  private postController: PostController;
  private bodyValidator: typeof bodyValidator;
  private categoryController: CategoryController;

  constructor(opts: Dependencies) {
    this.postController = opts.postController;
    this.categoryController = opts.categoryController;
    this.bodyValidator = opts.bodyValidator;
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
      this.bodyValidator(CreatePostDto),
      this.postController.create
    );
    this.router.get('/api/v1/posts', this.postController.getAll);
    this.router
      .route('/api/v1/posts/:id')
      .get(this.postController.getOne)
      .put(this.postController.update)
      .delete(this.postController.delete);
  }
  private routeCategories() {
    this.router.post(
      '/api/v1/categories',
      this.bodyValidator(CreateCategoryDto),
      this.categoryController.create
    );
    this.router.get('/api/v1/categories', this.categoryController.getAll);

    this.router
      .route('/api/v1/categories/:id')
      .get(this.categoryController.getOne)
      .put(this.bodyValidator(UpdateCategoryDto), this.categoryController.update)
      .delete(this.categoryController.delete);
  }

  init() {
    this.router.get('/', this.rootPath);
    this.routePosts();
    this.routeCategories();
    this.router.all('*', this.notFound);
  }
}
export default Index;
