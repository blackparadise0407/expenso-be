import { HttpStatus } from '../enums/HttpStatusEnum';
import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
  constructor(msg = 'The requested resource is not found on this server') {
    super(msg, HttpStatus.NOT_FOUND);
  }
}
