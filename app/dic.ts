import awilix = require('awilix');
import createDBConnection from './databaseConnection';
import App from './App';
import Index from './routes/Index';
import PostRouter from './routes/PostRouter';
import CategoryRouter from './routes/CategoryRouter';
import Post from './orm/entities/Post';
import Category from './orm/entities/Category';
import ValidationMiddleware from './middleware/validation.middleware';
import errorMiddleware from './middleware/error.middleware';
import EnvVariables from './dto/EnvVariables';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer(envVariables: EnvVariables) {
  return createDBConnection(envVariables).then(connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      categoryRepo: awilix.asValue(connection.getRepository(Category)),
      postRouter: awilix.asClass(PostRouter),
      categoryRouter: awilix.asClass(CategoryRouter),
      bodyValidator: awilix.asValue(ValidationMiddleware),
      errorMiddleware: awilix.asValue(errorMiddleware),
      envVariables: awilix.asValue(envVariables),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}
