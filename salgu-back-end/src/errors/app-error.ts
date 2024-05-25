import { HttpException } from '@nestjs/common';

export default class AppError extends HttpException {
  constructor(
    message: string,
    public data: any = {},
    public errorCode?: string,
    statusCode = 500,
  ) {
    super(message, statusCode);
  }
}
