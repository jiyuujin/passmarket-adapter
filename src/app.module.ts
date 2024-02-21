import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { PuppteerModule } from './puppeteer/puppeteer.module';
import { AfterPurchaseModule } from './after-purchase/after-purchase.module';
import { PassmarketOrderModule } from './passmarket-order/passmarket-order.module';
import { AfterPurchaseCommand } from './after-purchase/after-purchase.command';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './env/utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      expandVariables: true,
      load: [configuration],
    }),
    EnvModule,
    PuppteerModule,
    AfterPurchaseModule,
    PassmarketOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, AfterPurchaseCommand],
})
export class AppModule {}
