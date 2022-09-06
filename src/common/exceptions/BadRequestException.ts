import { HttpStatus } from '../enums/HttpStatusEnum';
import { HttpException } from './HttpException';

export class BadRequestException extends HttpException {
  constructor(
    msg = 'Your browser sent a request that this server could not understand',
  ) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}
