// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Multi-Event-Calendar-Tutorial App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display headline', async () => {
    await page.navigateTo();
    expect(await page.getInitialPageContentText())
      .toEqual('Multi-Event-Calendar-Tutorial');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
