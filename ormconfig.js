module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
