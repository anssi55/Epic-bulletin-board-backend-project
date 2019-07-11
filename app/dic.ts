import PostRouter from './routes/postRouter';
import { Post } from './orm/entities/Post';

import awilix = require('awilix');
import { createConnection } from 'typeorm';
import { App } from './app';
import { Index } from './routes';
import QueryValidator from './middleware/queryvalidator';
import Errorhandler from './middleware/errorhandler';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer() {
  return createConnection().then(async connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      errorhandler: awilix.asClass(Errorhandler),
      queryValidator: awilix.asClass(QueryValidator),
      postsRouter: awilix.asClass(PostRouter),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}

export default container;
