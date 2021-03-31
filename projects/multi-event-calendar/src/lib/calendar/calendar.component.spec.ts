// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { YearNavigationComponent } from '../year-navigation/year-navigation.component';
import { MonthComponent } from '../month/month.component';
import { MonthNavigationComponent } from '../month-navigation/month-navigation.component';
import { CellComponent } from '../cell/cell.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleChanges } from '@angular/core';
import { LocaleService } from '../locale.service';
import { of } from 'rxjs';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let localeService;
  const date = new Date(2021, 10);

  beforeEach(async () => {
    localeService = jasmine.createSpyObj('LocalService', ['registerLocale']);

    await TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        YearNavigationComponent,
        MonthNavigationComponent,
        MonthComponent,
        CellComponent
      ],
      imports: [ MatSelectModule, CommonModule, BrowserAnimationsModule ],
      providers: [
        { provide: LocaleService, useValue: localeService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    component.localeId = 'en';
    component.localeInitialized = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit should', () => {
    it('set year', () => {
      component.date = date;
      component.ngOnInit();
      expect(component.year).toBe(2021);
    });
    it('set month', () => {
      component.date = date;
      component.ngOnInit();
      expect(component.month).toBe(10);
    });
    it('set minSelectableYear', () => {
      component.date = date;
      component.ngOnInit();
      expect(component.minSelectableYear).toBe(2021);
    });
    it('set maxSelectableYear according to yearDistance', () => {
      component.date = date;
      component.yearDistance = 1;
      component.ngOnInit();
      expect(component.maxSelectableYear).toBe(2021);
    });
    it('set months', () => {
      component.date = date;
      component.ngOnInit();
      expect(component.months).toEqual([{
        year: 2021,
        month: 10,
        allowNavigation: true,
        events: []
      }]);
    });
    it('set calendarRangeStartDate', () => {
      component.date = date;
      component.ngOnInit();
      expect(component.calendarRangeStartDate).toEqual(date);
    });
    it('not change localeId if already set', () => {
      component.localeId = 'de';
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.localeId).toBe('de');
    });
    it('set localeInitialized if locale not set and not initialized yet', () => {
      component.localeId = '';
      component.localeInitialized = false;
      fixture.detectChanges();
      component.ngOnInit();
      expect(component.localeInitialized).toBe(true);
    });
  });

  describe('ngOnChanges should', () => {
    it('change nothing', () => {
      component.date = date;
      const changes: SimpleChanges = {
        previousValue: undefined,
        currentValue: undefined,
        firstChange: undefined,
        isFirstChange: undefined
      };
      component.ngOnChanges(changes);
      expect(component.year).toBe(2021);
      expect(component.month).toBe(10);
    });
  });

  describe('Calendar should', () => {
    it('include year-navigation', () => {
      expect(fixture.nativeElement.querySelector('mecal-year-navigation')).toBeTruthy();
    });

    it('include month-navigation', () => {
      expect(fixture.nativeElement.querySelector('mecal-month-navigation')).toBeTruthy();
    });

    it('include month', () => {
      expect(fixture.nativeElement.querySelector('mecal-month')).toBeTruthy();
    });
  });

  describe('set translationLocale should', () => {
    let registerLocaleSpy;

    beforeEach(() => {
      registerLocaleSpy = localeService.registerLocale.and.returnValue(of('ru'));
    });

    it('set localeId if changed', () => {
      component.translationLocale = 'ru';
      expect(component.localeId).toBe('ru');
    });

    it('set localeId if not changed', () => {
      component.translationLocale = 'en';
      expect(component.localeId).toBe('en');
    });

    it('set localeInitialized if localeId changed', () => {
      component.localeInitialized = false;
      fixture.detectChanges();

      component.translationLocale = 'ru';
      expect(component.localeInitialized).toBe(true);
    });

    it('set localeInitialized if localeId not changed', () => {
      component.localeInitialized = false;
      fixture.detectChanges();

      component.translationLocale = 'en';
      expect(component.localeInitialized).toBe(true);
    });
  });

  describe('daySelected should', () => {
    it('emit the selected day onDaySelected', () => {
      spyOn(component.daySelected, 'emit');
      component.onDaySelected(1);
      expect(component.daySelected.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('eventDaySelected should', () => {
    it('emit the selected day onEventDaySelected', () => {
      spyOn(component.eventDaySelected, 'emit');
      component.onEventDaySelected(1);
      expect(component.eventDaySelected.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('selectedEventDaySelected should', () => {
    it('emit the selected day onSelectedEventDaySelected', () => {
      spyOn(component.selectedEventDaySelected, 'emit');
      component.onSelectedEventDaySelected(1);
      expect(component.selectedEventDaySelected.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('dayFocused should', () => {
    it('emit the focused day onDayFocused', () => {
      spyOn(component.dayFocused, 'emit');
      component.onDayFocused(1);
      expect(component.dayFocused.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('monthSelected should', () => {
    it('emit first day of next month onNextMonthSelected', () => {
      component.maxSelectableYear = 2020;
      component.maxSelectableYear = 2025;
      component.year = date.getFullYear();
      component.month = date.getMonth();
      spyOn(component.monthSelected, 'emit');
      component.onNextMonthSelected();
      expect(component.monthSelected.emit).toHaveBeenCalledWith(new Date(date.getFullYear(), date.getMonth() + 1));
    });
    it('emit first day of previous month onPreviousMonthSelected', () => {
      component.maxSelectableYear = 2020;
      component.maxSelectableYear = 2025;
      component.year = date.getFullYear();
      component.month = date.getMonth();
      spyOn(component.monthSelected, 'emit');
      component.onPreviousMonthSelected();
      expect(component.monthSelected.emit).toHaveBeenCalledWith(new Date(date.getFullYear(), date.getMonth() - 1));
    });
  });

  describe('yearSelected should', () => {
    it('emit value of selected year onYearChanged', () => {
      component.maxSelectableYear = 2020;
      component.maxSelectableYear = 2025;
      spyOn(component.yearSelected, 'emit');
      component.onYearChanged(2021);
      expect(component.yearSelected.emit).toHaveBeenCalledWith(2021);
    });
  });
});
