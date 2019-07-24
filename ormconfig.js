module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNC,
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
