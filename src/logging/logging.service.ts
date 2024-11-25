import { LoggerService, Injectable, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoggingService extends ConsoleLogger implements LoggerService {
  private readonly logLevels = ['log', 'warn', 'error', 'debug', 'verbose'];
  private readonly logLevel: string;

  constructor(private configService: ConfigService) {
    super();
    this.logLevel = this.configService.get('LOG_LEVEL') || 'log';
  }

  log(message: string) {
    if (this.getLogs('log')) {
      super.log(message);
    }
  }

  error(message: string) {
    if (this.getLogs('error')) {
      super.error(message);
    }
  }

  warn(message: string) {
    if (this.getLogs('warn')) {
      super.warn(message);
    }
  }

  debug(message: string, ...optionalParams: any[]) {
    if (this.getLogs('debug')) {
      super.debug(message, ...optionalParams);
    }
  }

  verbose(message: string, ...optionalParams: any[]) {
    if (this.getLogs('verbose')) {
      super.verbose(message, ...optionalParams);
    }
  }

  private getLogs(level: string) {
    return (
      this.logLevels.indexOf(level) >= this.logLevels.indexOf(this.logLevel)
    );
  }
}
