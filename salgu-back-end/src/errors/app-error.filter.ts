import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import AppError from './app-error';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse: any = exception.getResponse();

    const resData = {
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Temporary hack to handle exceptions raised by ValidationPipe
    // TODO: Find a better way to handle this with ValidationPipe
    if (errorResponse?.message) resData.message = errorResponse.message;

    if (exception instanceof AppError) {
      resData['errorData'] = exception.data;
      if (exception?.errorCode) resData['errorCode'] = exception.errorCode;
    }

    response.status(status).json(resData);
  }
}
