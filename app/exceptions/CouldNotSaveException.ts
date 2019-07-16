import HttpException from './HttpException';

class CouldNotSaveException extends HttpException {
  constructor() {
    super(500, `Data coudn't be saved to database`);
  }
}

export default CouldNotSaveException;
