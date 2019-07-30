import { plainToClass } from 'class-transformer';
import EnvVariables from './dto/EnvVariables';
import { validate } from 'class-validator';
import dotenv from 'dotenv';

function validateEnvVariables() {
  const result = dotenv.config({ path: '.env' });
  console.log(result);
  const variables = plainToClass(EnvVariables, result.parsed);
  return validate(variables).then(errors => {
    if (errors.length > 0) {
      const message =
        'Validation error(s): ' + errors.map(error => Object.values(error.constraints)).join(', ');
      throw message;
    } else {
      return variables;
    }
  });
}

export default validateEnvVariables;
