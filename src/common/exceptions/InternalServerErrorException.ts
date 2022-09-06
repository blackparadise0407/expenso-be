import { HttpStatus } from '../enums/HttpStatusEnum';
import { HttpException } from './HttpException';

export class InternalServerErrorException extends HttpException {
  constructor(
    msg = 'The server encountered an internal error or misconfiguration and was unable to complete your request',
  ) {
    super(msg, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
