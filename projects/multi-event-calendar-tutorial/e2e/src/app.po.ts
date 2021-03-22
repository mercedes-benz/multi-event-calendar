// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getInitialPageContentText(): Promise<string> {
    return element(by.css('app-root h1')).getText();
  }
}
