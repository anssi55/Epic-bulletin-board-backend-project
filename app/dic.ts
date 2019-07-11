import PostsRouter from './routes/PostsRouter';
import Post from './orm/entities/Post';

import awilix = require('awilix');
import { createConnection } from 'typeorm';
import App from './App';
import Index from './routes/Index';

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

export function configcontainer() {
  return createConnection().then(connection => {
    container.register({
      postRepo: awilix.asValue(connection.getRepository(Post)),
      postsController: awilix.asClass(PostsRouter),
      app: awilix.asClass(App),
      index: awilix.asClass(Index)
    });
    return container;
  });
}
