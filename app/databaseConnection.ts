import EnvVariables from './dto/EnvVariables';
import { createConnection } from 'typeorm';

function createDBConnection(envVariables: EnvVariables) {
  return createConnection({
    type: 'mysql',
    host: envVariables.DB_HOST,
    port: envVariables.DB_PORT,
    username: envVariables.DB_USERNAME,
    password: envVariables.DB_PASSWORD,
    database: envVariables.DB_DATABASE,
    synchronize: envVariables.DB_SYNC,
    logging: false,
    entities: ['build/orm/entities/*.js']
  });
}

export default createDBConnection;
