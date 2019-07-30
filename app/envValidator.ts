import { plainToClass } from 'class-transformer';
import EnvVariables from './dto/EnvVariables';
import { validate } from 'class-validator';
import dotenv from 'dotenv';

function validateEnvVariables() {
  const variablesToProcess = getEnvVariables();
  const envVariables = plainToClass(EnvVariables, variablesToProcess);
  return validate(envVariables).then(errors => {
    if (errors.length > 0) {
      const message =
        'Validation error(s): ' + errors.map(error => Object.values(error.constraints)).join(', ');
      throw message;
    } else {
      return envVariables;
    }
  });
}
function getEnvVariables() {
  const variablesFromFile = dotenv.config();
  return !variablesFromFile.error ? variablesFromFile.parsed : process.env;
}

export default validateEnvVariables;
