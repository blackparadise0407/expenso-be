import { HttpStatus } from '../enums/HttpStatusEnum';

export class HttpException extends Error {
  public status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    super(message);
    this.status = status;
  }
}
