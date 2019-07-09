import PostsRouter from './routes/postsRouter';
import { Post } from './orm/entities/Post';

import awilix = require('awilix');
import { createConnection } from 'typeorm';
import { App } from './app';
import { Index } from './routes';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer() {
  return createConnection().then(async connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      postsController: awilix.asClass(PostsRouter),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}

export default container;
