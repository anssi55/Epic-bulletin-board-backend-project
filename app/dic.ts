import awilix = require('awilix');
import { createConnection } from 'typeorm';

import App from './App';
import Index from './routes/Index';
import QueryValidator from './middleware/queryvalidator';
import ErrorHandler from './middleware/errorhandler';
import PostRouter from './routes/PostRouter';
import Post from './orm/entities/Post';
import Category from './orm/entities/Category';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer() {
  return createConnection().then(async connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      categoryRepo: awilix.asValue(connection.getRepository(Category)),
      errorHandler: awilix.asClass(ErrorHandler),
      queryValidator: awilix.asClass(QueryValidator),
      postsRouter: awilix.asClass(PostRouter),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}

export default container;
