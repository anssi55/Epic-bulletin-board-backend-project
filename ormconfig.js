module.exports = {
  type: 'mysql',
  host: process.env.JAWSDB_HOST || 'localhost',
  port: 3306,
  username: process.env.JAWSDB_USERNAME || 'newuser',
  password: process.env.JAWSDB_PASSWORD || 'password',
  database: process.env.JAWSDB_DATABASE || 'bulletinboard2',
  synchronize: true,
  logging: false,
  entities: ['build/orm/entities/*.js'],
  migrations: ['build/orm/migration/**/*.js'],
  subscribers: ['build/orm/subscriber/**/*.js'],
  cli: {
    entitiesDir: 'build/orm/entities',
    migrationsDir: 'build/orm/migration',
    subscribersDir: 'build/orm/subscriber'
  }
};
/*host: process.env.JAWSDB_HOST,
  port: 3306,
  username: process.env.JAWSDB_USERNAME,
  password: process.env.JAWSDB_PASSWORD,
  database: process.env.JAWSDB_DATABASE,*/
