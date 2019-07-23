module.exports = {
  type: 'mysql',
  host: process.env.JAWSDB_HOST,
  port: 3306,
  username: process.envJAWSDB_USERNAME,
  password: process.envJAWSDB_PASSWORD,
  database: process.envJAWSDB_DATABASE
};
