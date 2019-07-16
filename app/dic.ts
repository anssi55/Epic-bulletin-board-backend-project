import awilix = require('awilix');
import { createConnection } from 'typeorm';

import App from './App';
import Index from './routes/Index';
import PostRouter from './routes/PostRouter';
import Post from './orm/entities/Post';
import Category from './orm/entities/Category';
import ValidationMiddleware from './middleware/validation.middleware';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer() {
  return createConnection().then(async connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      categoryRepo: awilix.asValue(connection.getRepository(Category)),
      postRouter: awilix.asClass(PostRouter),
      validator: awilix.asValue(ValidationMiddleware),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}

export default container;
