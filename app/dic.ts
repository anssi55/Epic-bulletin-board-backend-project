import awilix = require('awilix');
import createDBConnection from './databaseConnection';
import App from './App';
import Index from './routers/Index';
import PostController from './controllers/PostController';
import CategoryController from './controllers/CategoryController';
import Post from './orm/entities/Post';
import Category from './orm/entities/Category';
import ValidationMiddleware from './middleware/ValidationMiddleware';
import errorMiddleware from './middleware/error.middleware';
import EnvVariables from './dto/EnvVariables';
import PostService from './services/PostService';
import CategoryService from './services/CategoryService';
import User from './orm/entities/User';
import UserService from './services/UserService';
import UserController from './controllers/UserController';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer(envVariables: EnvVariables) {
  return createDBConnection(envVariables).then(connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      categoryRepo: awilix.asValue(connection.getRepository(Category)),
      userRepo: awilix.asValue(connection.getRepository(User)),

      postController: awilix.asClass(PostController),
      categoryController: awilix.asClass(CategoryController),
      userController: awilix.asClass(UserController),

      validator: awilix.asClass(ValidationMiddleware),
      errorMiddleware: awilix.asValue(errorMiddleware),

      envVariables: awilix.asValue(envVariables),
      app: awilix.asClass(App),
      index: awilix.asClass(Index),

      postService: awilix.asClass(PostService),
      userService: awilix.asClass(UserService),
      categoryService: awilix.asClass(CategoryService)
    });
    return container;
  });
}
