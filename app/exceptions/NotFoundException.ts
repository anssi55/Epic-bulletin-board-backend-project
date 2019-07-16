import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(type: String, id: String) {
    super(404, `${type} with id ${id} not found`);
  }
}

export default NotFoundException;
