import { plainToClass } from 'class-transformer';
import EnvVariables from './dto/EnvVariables';
import { validate } from 'class-validator';
import dotenv from 'dotenv';

function validateEnvVariables() {
  let result2;
  const result = dotenv.config();
  if (result.error != null) {
    result2 = result.parsed;
  } else {
    result2 = process.env;
  }
  const variables = plainToClass(EnvVariables, result2);
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
