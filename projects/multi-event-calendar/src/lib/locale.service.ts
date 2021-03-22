// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { Injectable } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LocaleService {
  private readonly defaultLocale = 'en';

  get defaultLocaleId(): string {
    return this.defaultLocale;
  }

  registerLocale(localeId: string): Observable<string> {
    const registeredLocaleId = new Subject<string>();

    if (localeId && '' !== localeId) {
      import(`dayjs/locale/${localeId}.js`).then( module => {
        registerLocaleData(module.default, module.default.name);
        registeredLocaleId.next(localeId);
      }).catch(error => {
        console.warn('Unsupported value provided for translationLocaleId!', error);
        registeredLocaleId.next(this.defaultLocale);
      });
    }
    return registeredLocaleId;
  }
}
