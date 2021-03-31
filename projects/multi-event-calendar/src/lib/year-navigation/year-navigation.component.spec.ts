// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearNavigationComponent } from './year-navigation.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionSelectionChange } from '@angular/material/core';

describe('YearNavigationComponent', () => {
  let component: YearNavigationComponent;
  let fixture: ComponentFixture<YearNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearNavigationComponent ],
      imports: [ MatSelectModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render year select list', () => {
    component.selectedYear = 2020;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('mat-select')).toBeTruthy();
  });

  describe('yearChanged should', () => {
    it('emit the value of the new selected year', () => {
      component.selectedYear = 2021;
      const event = {
        isUserInput: true,
        source: {
          value: 2019
        }
      };
      spyOn(component.yearChanged, 'emit');

      component.onSelectionChange(event as MatOptionSelectionChange);
      expect(component.yearChanged.emit).toHaveBeenCalledWith(2019);
    });
  });
});
