import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  private readonly logger = new Logger(EnvService.name);

  constructor(private configService: ConfigService) {
    //
  }

  isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get PASSMARKET_EVENT_ID() {
    return this.configService.getOrThrow('passmarketEventId');
  }

  get PASSMARKET_BASIC_ID() {
    return this.configService.getOrThrow('passmarketBasicId');
  }

  get PASSMARKET_BASIC_PASSWORD() {
    return this.configService.getOrThrow('passmarketBasicPassword');
  }
}
