import awilix = require('awilix');
import { createConnection } from 'typeorm';

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
  return createConnection({
    type: 'mysql',
    host: envVariables.DB_HOST,
    port: envVariables.DB_PORT,
    username: envVariables.DB_USERNAME,
    password: envVariables.DB_PASSWORD,
    database: envVariables.DB_DATABASE,
    synchronize: envVariables.DB_SYNC,
    logging: false,
    entities: ['build/orm/entities/*.js'],
    migrations: ['build/orm/migration/**/*.js'],
    subscribers: ['build/orm/subscriber/**/*.js'],
    cli: {
      entitiesDir: 'build/orm/entities',
      migrationsDir: 'build/orm/migration',
      subscribersDir: 'build/orm/subscriber'
    }
  }).then(connection => {
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
