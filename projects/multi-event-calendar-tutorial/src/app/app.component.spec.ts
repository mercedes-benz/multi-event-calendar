// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MultiEventCalendarModule } from 'multi-event-calendar';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ MultiEventCalendarModule ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Multi-Event-Calendar-Tutorial'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Multi-Event-Calendar-Tutorial');
  });
});
