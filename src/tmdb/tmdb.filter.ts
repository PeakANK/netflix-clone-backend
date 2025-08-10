import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';
import { errorResponse } from '../utils/response.util';

@Catch()
export class TmdbExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if (exception?.isAxiosError) {
      const err = exception as AxiosError<any>;
      const status = (err.response?.status as number) ?? HttpStatus.BAD_GATEWAY;
      const payload = err.response?.data;
      const message =
        payload?.status_message ||
        payload?.message ||
        err.message ||
        'Upstream error';

      return res
        .status(status)
        .json(errorResponse(message, status, { tmdb_status_code: payload?.status_code }));
    }

    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    return res
      .status(status)
      .json(errorResponse(exception?.message ?? 'Internal server error', status));
  }
}
