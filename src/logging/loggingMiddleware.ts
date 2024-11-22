import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, query } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      const bodyToJSON = isNotEmptyObject(body) ? JSON.stringify(body) : '';
      const queryToJSON = isNotEmptyObject(query) ? JSON.stringify(query) : '';

      const message = `${statusCode} ${method} ${originalUrl} ${bodyToJSON} ${queryToJSON}`;

      if (statusCode >= 500) {
        this.loggingService.error(message);
        return;
      }

      if (statusCode >= 400) {
        this.loggingService.warn(message);
        return;
      }

      this.loggingService.log(message);
    });

    next();
  }
}
