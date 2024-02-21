import { Injectable, Logger } from '@nestjs/common';
import { Page } from 'puppeteer';
import { Constants } from '../constnats';
import { EnvService } from '../env/env.service';
import { IPuppeteerService } from '../puppeteer/puppeteer.service';
import { Selectors } from '../selectors';
import path from 'path';
import { ScraperPage } from '../scraper-page/scraper-page';

@Injectable()
export class PassmarketOrderService extends ScraperPage {
  private readonly logger = new Logger(PassmarketOrderService.name);

  constructor(envService: EnvService, puppeteerService: IPuppeteerService) {
    super(envService, puppeteerService);
  }

  private async login(page: Page) {
    await page.goto(Constants.PASSMARKET_LOGIN_URL, {
      waitUntil: 'domcontentloaded',
    });
    await page.type(
      Selectors.ORDERS.SEARCH_INPUT_ID,
      this.envService.PASSMARKET_BASIC_ID,
    );
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(Selectors.ORDERS.NEXT_EXECUTE),
    ]);

    // await page.type(
    //   Selectors.ORDERS.SEARCH_INPUT_PASSWORD,
    //   this.envService.PASSMARKET_BASIC_PASSWORD,
    // );
    // await Promise.all([
    //   page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    //   page.click(Selectors.ORDERS.SEARCH_EXECUTE),
    // ]);
  }

  private async download(page: Page) {
    await page.goto(
      `${Constants.PASSMARKET_DASHBOARD_URL}?event_id=${this.envService.PASSMARKET_EVENT_ID}`,
      {
        waitUntil: 'domcontentloaded',
      },
    );

    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: path.resolve(__dirname, '../../download'),
    });
    await page.click(Selectors.ORDERS.DOWNLOAD_EXECUTE);
  }

  async getOrders() {
    const { browser, page } = await this.puppeteerService.generate(
      (request) => {
        this.handleRequest(request);
      },
    );

    try {
      await this.login(page);

      // 確認コード入力画面は別途調査要
      // await this.download(page);
    } catch (e) {
      this.logger.error(e);
      return [];
    } finally {
      await browser.close();
    }
  }
}
