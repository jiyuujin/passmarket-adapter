import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AfterPurchaseService } from './after-purchase.service';
import { PassmarketOrderService } from '../passmarket-order/passmarket-order.service';
import { EnvService } from '../env/env.service';
import {
  IPuppeteerService,
  PuppeteerService,
} from '../puppeteer/puppeteer.service';
import { AfterPurchaseCommand } from './after-purchase.command';
import { configuration } from '../env/utils';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    EnvModule,
  ],
  providers: [
    ConfigService,
    EnvService,
    {
      provide: IPuppeteerService,
      useClass: PuppeteerService,
    },
    AfterPurchaseCommand,
    AfterPurchaseService,
    PassmarketOrderService,
  ],
})
export class AfterPurchaseModule {}
