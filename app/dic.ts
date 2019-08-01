import awilix = require('awilix');
import createDBConnection from './databaseConnection';
import App from './App';
import Index from './routers/Index';
import PostController from './controllers/PostController';
import CategoryController from './controllers/CategoryController';
import Post from './orm/entities/Post';
import Category from './orm/entities/Category';
import BodyValidationMiddleware from './middleware/bodyValidation.middleware';
import errorMiddleware from './middleware/error.middleware';
import EnvVariables from './dto/EnvVariables';
import PostModel from './models/PostModel';
import CategoryModel from './models/CategoryModel';
import UrlValidationMiddleware from './middleware/urlValidation.middleware';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer(envVariables: EnvVariables) {
  return createDBConnection(envVariables).then(connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      categoryRepo: awilix.asValue(connection.getRepository(Category)),

      postController: awilix.asClass(PostController),
      categoryController: awilix.asClass(CategoryController),

      urlValidator: awilix.asValue(UrlValidationMiddleware),
      bodyValidator: awilix.asValue(BodyValidationMiddleware),
      errorMiddleware: awilix.asValue(errorMiddleware),

      envVariables: awilix.asValue(envVariables),
      app: awilix.asClass(App),
      index: awilix.asClass(Index),

      postModel: awilix.asClass(PostModel),
      categoryModel: awilix.asClass(CategoryModel)
    });
    return container;
  });
}
