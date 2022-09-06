import { HttpStatus } from '../enums/HttpStatusEnum';
import { HttpException } from './HttpException';

export class UnauthorizedException extends HttpException {
  constructor(msg = 'Unauthorized') {
    super(msg, HttpStatus.UNAUTHORIZED);
  }
}
