import { HttpStatus } from '../enums/HttpStatusEnum';
import { HttpException } from './HttpException';

export class ForbiddenException extends HttpException {
  constructor(msg = "You don't have permission to access this resource") {
    super(msg, HttpStatus.FORBIDDEN);
  }
}
