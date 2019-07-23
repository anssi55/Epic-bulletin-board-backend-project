module.exports = {
  type: 'mysql',
  host: process.env.JAWSDB_HOST,
  port: 3306,
  username: process.env.JAWSDB_USERNAME,
  password: process.env.JAWSDB_PASSWORD,
  database: process.env.JAWSDB_DATABASE
};
