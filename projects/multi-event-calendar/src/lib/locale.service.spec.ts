// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { LocaleService } from './locale.service';

describe('LocaleService test suite', () => {
  let localeService: LocaleService;

  beforeEach(() => {
    localeService = new LocaleService();
    spyOn(console, 'warn');
  });

  it('should create', () => {
    expect(localeService).toBeTruthy();
  });

  describe('get defaultLocaleId should', () => {
    it('always return en', () => {
      const id = localeService.defaultLocaleId;
      expect(id).toBe('en');
    });
  });

  describe('registerLocale should', () => {
    it('emit registered locale on success (valid locale)', (done: DoneFn) => {
      localeService.registerLocale('de').subscribe(registeredLocale => {
        expect(registeredLocale).toBe('de');
        done();
      });
    });

    it('emit default locale on failure (invalid locale)', (done: DoneFn) => {
      localeService.registerLocale('unknown').subscribe(registeredLocale => {
        expect(registeredLocale).toBe(localeService.defaultLocaleId);
        done();
      });
    });

    it('print warning on console on failure (invalid locale)', (done: DoneFn) => {
      localeService.registerLocale('unknown').subscribe(registeredLocale => {
        expect(console.warn).toHaveBeenCalled();
        done();
      });
    });
  });
});
