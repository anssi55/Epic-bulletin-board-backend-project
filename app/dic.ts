import awilix = require('awilix');
import { createConnection } from 'typeorm';

import App from './Apps';
import Index from './routes/Indexs';
import PostRouter from './routes/PostRouters';
import CategoryRouter from './routes/CategoryRouters';
import Post from './orm/entities/Post';
import Category from './orm/entities/Category';
import ValidationMiddleware from './middleware/validation.middleware';
import errorMiddleware from './middleware/error.middleware';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer() {
  return createConnection().then(connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      categoryRepo: awilix.asValue(connection.getRepository(Category)),
      postRouter: awilix.asClass(PostRouter),
      categoryRouter: awilix.asClass(CategoryRouter),
      bodyValidator: awilix.asValue(ValidationMiddleware),
      errorMiddleware: awilix.asValue(errorMiddleware),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}
