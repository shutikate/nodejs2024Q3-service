import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from './logging.service';
import { isNotEmptyObject } from 'class-validator';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, body, query } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      const bodyToJSON = isNotEmptyObject(body) ? JSON.stringify(body) : '';
      const queryToJSON = isNotEmptyObject(query) ? JSON.stringify(query) : '';

      const message = `${method} ${url} ${bodyToJSON} ${queryToJSON} ${statusCode}`;

      this.loggingService.log(message);
    });

    next();
  }
}
