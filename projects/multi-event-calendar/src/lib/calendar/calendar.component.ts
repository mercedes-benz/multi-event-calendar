// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import * as dayjs_ from 'dayjs';
import * as between_ from 'dayjs/plugin/isBetween';
import { LocaleService } from '../locale.service';

const dayjs = dayjs_;

export interface CalendarEvent {
  startDate: Date;
  endDate: Date;
  selected: boolean;
}

interface CalendarMonth {
  year: number;
  month: number;
  allowNavigation: boolean;
  events: CalendarEvent[];
}

@Component({
  selector: 'mecal-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent  implements OnInit, OnChanges {
  @Input()
  date = new Date();
  @Input()
  numberOfMonths = 1;
  @Input()
  events: CalendarEvent[] = [];
  @Input()
  yearDistance = 3;

  @Output()
  daySelected = new EventEmitter<number>();
  @Output()
  eventDaySelected = new EventEmitter<number>();
  @Output()
  selectedEventDaySelected = new EventEmitter<number>();
  @Output()
  dayFocused = new EventEmitter<number>();
  @Output()
  monthSelected = new EventEmitter<Date>();
  @Output()
  yearSelected = new EventEmitter<number>();

  year: number;
  month: number;
  months: CalendarMonth[] = [];
  minSelectableYear: number;
  maxSelectableYear: number;
  calendarRangeStartDate: Date;
  localeId: string;
  localeInitialized = false;

  constructor(private localeService: LocaleService) {
    dayjs.extend(between_);
  }

  ngOnInit(): void {
    if (this.date) {
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
      this.minSelectableYear = this.year;
      this.maxSelectableYear = this.minSelectableYear + this.yearDistance - 1;
      this.months = this.getMonths(this.year, this.month);
      this.calendarRangeStartDate = new Date(this.year, this.month);
    }

    const noLocaleProvided = !this.localeInitialized && !this.localeId;
    if (noLocaleProvided) {
      this.localeId = this.localeService.defaultLocaleId;
      this.localeInitialized = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isDateHidden(changes.date)) {
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth();
    }
    if (this.isEventsChanged(changes.events)) {
      this.months = this.getMonths(this.year, this.month);
    }
    if (this.isDateYearOutOfStartRange()) {
      this.calendarRangeStartDate = new Date(this.year, this.month);
      this.minSelectableYear = this.year;
      this.months = this.getMonths(this.year, this.month);
    }
  }

  @Input()
  set translationLocale(localeId: string) {
    this.localeId = localeId;

    if (this.localeService.defaultLocaleId === localeId) {
      this.localeInitialized = true;
      return;
    }

    if (localeId && this.localeService.defaultLocaleId !== localeId) {
      this.localeService.registerLocale(localeId).subscribe(() => {
        this.localeInitialized = true;
      });
    }
  }

  onDaySelected(timeStamp: number): void {
    this.daySelected.emit(timeStamp);
  }

  onEventDaySelected(timeStamp: number): void {
    this.eventDaySelected.emit(timeStamp);
  }

  onSelectedEventDaySelected(timeStamp: number): void {
    this.selectedEventDaySelected.emit(timeStamp);
  }

  onDayFocused(timeStamp: number): void {
    this.dayFocused.emit(timeStamp);
  }

  onYearChanged(selectedYear: number): void {
    if (this.isYearInAllowedRange(selectedYear)) {
      this.year = selectedYear;
      this.months = this.getMonths(this.year, this.month);
      this.yearSelected.emit(this.year);
    }
  }

  onPreviousMonthSelected(): void {
    const date = new Date(this.year, this.month);
    date.setMonth(date.getMonth() - 1);

    if (this.isYearInAllowedRange(date.getFullYear())) {
      this.setValues(date.getFullYear(), date.getMonth());
      this.monthSelected.emit(new Date(date.getTime()));
    }
  }

  onNextMonthSelected(): void {
    const date = new Date(this.year, this.month);
    date.setMonth(date.getMonth() + 1);

    if (this.isYearInAllowedRange(date.getFullYear())) {
      this.setValues(date.getFullYear(), date.getMonth());
      this.monthSelected.emit(new Date(date.getTime()));
    }
  }

  private isDateYearOutOfStartRange(): boolean {
    return (
      this.calendarRangeStartDate &&
      this.date.getFullYear() < this.calendarRangeStartDate.getFullYear()
    );
  }

  private isDateHidden(dateChange: SimpleChange): boolean {
    return !this.months
      .filter(() => dateChange && !dateChange.isFirstChange())
      .filter(() => dateChange.currentValue.getFullYear() === this.year)
      .filter(month => month.year === this.year)
      .some((month: CalendarMonth) => month.month === dateChange.currentValue.getMonth());
  }

  private isEventsChanged(eventsChange: SimpleChange): boolean {
    return (
      eventsChange &&
      !eventsChange.isFirstChange() &&
      eventsChange.previousValue !== eventsChange.currentValue
    );
  }

  private setValues(year: number, month: number): void {
    this.months = this.getMonths(year, month);
    this.month = month;
    this.year = year;
  }

  private getMonths(year: number, month: number): CalendarMonth[] {
    const months: CalendarMonth[] = [];
    const date = new Date(year, month);

    for (let i = 0; i < this.numberOfMonths; i++) {
      if (this.isYearInAllowedRange(date.getFullYear())) {
        months.push({
          year: date.getFullYear(),
          month: date.getMonth(),
          allowNavigation: i === 0,
          events: this.events.filter(event => dayjs(date).isBetween(event.startDate, event.endDate, 'month', '[]')
          )
        });
        date.setMonth(date.getMonth() + 1);
      }
    }
    return months;
  }

  private isYearInAllowedRange(selectedYear: number): boolean {
    return selectedYear >= this.minSelectableYear && selectedYear <= this.maxSelectableYear;
  }
}
