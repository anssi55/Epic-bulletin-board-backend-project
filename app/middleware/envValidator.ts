import { plainToClass } from 'class-transformer';
import EnvVariables from '../dto/EnvVariables';
import { validate } from 'class-validator';
import dotenv from 'dotenv';

function validateEnvVariables() {
  const result = dotenv.config();

  validate(plainToClass(EnvVariables, result.parsed)).then(errors => {
    if (errors.length > 0) {
      const message =
        'Validation error(s): ' + errors.map(error => Object.values(error.constraints)).join(', ');
      console.log(message);
      process.exit(1);
    }
  });
}

export default validateEnvVariables;
