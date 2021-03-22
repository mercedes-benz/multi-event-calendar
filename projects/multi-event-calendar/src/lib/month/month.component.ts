// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CalendarEvent } from '../calendar/calendar.component';
import { Cell, DayCell, HighLiteType, Type } from '../cell/cell.model';
import { Dayjs } from 'dayjs';
import * as dayjs_ from 'dayjs';
import * as weekday_ from 'dayjs/plugin/weekday';
import * as isSameOrBefore_ from 'dayjs/plugin/isSameOrBefore';
import * as weekOfYear_ from 'dayjs/plugin/weekOfYear';

const dayjs = dayjs_;

@Component({
  selector: 'mecal-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnChanges {
  @Input()
  year: number;
  @Input()
  month: number;
  @Input()
  events: CalendarEvent[] = [];
  @Input()
  locale: string;

  @Output()
  daySelected = new EventEmitter<number>();
  @Output()
  eventDaySelected = new EventEmitter<number>();
  @Output()
  selectedEventDaySelected = new EventEmitter<number>();
  @Output()
  dayFocused = new EventEmitter<number>();

  days = new Array<DayCell>();
  weekDays = new Array<Cell>();
  weekNumbers = new Array<Cell>();

  constructor() {
    dayjs.extend(weekday_);
    dayjs.extend(isSameOrBefore_);
    dayjs.extend(weekOfYear_);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasChangedLocale(changes.locale)) {
      this.locale = changes.locale.currentValue;
      this.weekDays = this.defineWeekDays();
    }

    if (this.hasChangedYear(changes.year) || this.hasChangedMonth(changes.month)) {
      this.days = this.defineDays(changes.year.currentValue, changes.month.currentValue);
      this.weekNumbers = this.defineWeekNumbers(this.days);
    }
  }

  onDayCellClicked(cell: DayCell): void {
    if (cell.highLiteTypes.some(highLite => highLite === HighLiteType.selected)) {
      this.selectedEventDaySelected.emit(cell.timeStamp);
    } else if (cell.highLiteTypes.some(highLite => highLite === HighLiteType.eventDay)) {
      this.eventDaySelected.emit(cell.timeStamp);
    } else if (cell.active) {
      this.daySelected.emit(cell.timeStamp);
    }
  }

  onDayCellFocused(cell: DayCell): void {
    this.dayFocused.emit(cell.timeStamp);
  }

  private hasChangedYear(year: any): boolean {
    return year && (year.currentValue !== this.year || year.isFirstChange());
  }

  private hasChangedMonth(month: any): boolean {
    return month && (month.currentValue !== this.month || month.isFirstChange());
  }

  private hasChangedLocale(locale: any): boolean {
    return locale && (locale.currentValue !== this.locale || locale.isFirstChange());
  }

  private defineWeekDays(): Cell[] {
    return [0, 1, 2, 3, 4, 5, 6]
      .map(weekday => dayjs().locale(this.locale).weekday(weekday))
      .map(day => this.createWeekDayCell(day.clone().locale(this.locale).format('ddd')));
  }

  private defineWeekNumbers(monthDays: DayCell[]): Cell[] {
    return monthDays
      .filter((monthDay, index) => index === 0 || index % 7 === 0)
      .map(monthDay => this.createWeekNumberCell(monthDay));
  }

  private defineDays(year: number, month: number): DayCell[] {
    const firstOfMonth = dayjs(new Date(year, month));
    const daysBefore = this.defineDaysBefore(firstOfMonth.clone().locale(this.locale));

    const lastOfMonth = firstOfMonth.add(1, 'M').subtract(1, 'd');
    const days = this.defineDaysCurrent(lastOfMonth.clone());

    const daysAfter = this.defineDaysAfter(lastOfMonth.clone().locale(this.locale));

    return [...daysBefore, ...days, ...daysAfter];
  }

  private defineDaysBefore(firstOfMonth: Dayjs): DayCell[] {
    const daysBefore: DayCell[] = [];

    for (let day = firstOfMonth; day.weekday() % 7 > 0; ) {
      day = day.subtract(1, 'd');
      daysBefore.push(this.createDateCell(day.clone(), false));
    }
    return daysBefore.reverse();
  }

  private defineDaysCurrent(lastOfMonth: Dayjs): DayCell[] {
    const currentDays: DayCell[] = [];

    for (
      let day = dayjs(new Date(lastOfMonth.year(), lastOfMonth.month()));
      day.isSameOrBefore(lastOfMonth);
      day = day.add(1, 'd')
    ) {
      currentDays.push(this.createDateCell(day.clone(), true));
    }
    return currentDays;
  }

  private defineDaysAfter(lastOfMonth: Dayjs): DayCell[] {
    const daysAfter: DayCell[] = [];

    for (let day = lastOfMonth; day.weekday() % 7 !== 6; ) {
      day = day.add(1, 'd');
      daysAfter.push(this.createDateCell(day, false));
    }
    return daysAfter;
  }

  private createDateCell(date: Dayjs, active: boolean): DayCell {
    return {
      id: date.valueOf().toString(),
      label: date.date().toString(),
      type: Type.date,
      highLiteTypes: this.getHighlightTypes(date),
      timeStamp: date.valueOf(),
      active
    };
  }

  private createWeekDayCell(weekDayName: string): Cell {
    return {
      id: weekDayName,
      label: weekDayName,
      type: Type.weekDay,
      highLiteTypes: [HighLiteType.none],
      active: false
    };
  }

  private createWeekNumberCell(monthDay: DayCell): Cell {
    const date = dayjs(monthDay.timeStamp);
    const weekNumber = date.week().toString();
    const dateTimeInMillis = date.millisecond().toString();
    const id = weekNumber.concat('-').concat(dateTimeInMillis);

    return {
      id,
      label: weekNumber,
      type: Type.weekNumber,
      highLiteTypes: [HighLiteType.none],
      active: false
    };
  }

  private getHighlightTypes(monthDay: Dayjs): HighLiteType[] {
    const highlightTypes: HighLiteType[] = [];

    if (dayjs().isSame(monthDay, 'day')) {
      highlightTypes.push(HighLiteType.currentDay);
    }

    const eventHighlights: HighLiteType[][] = this.events.map(foundEvent => {
      const foundEventHighlighTypes: HighLiteType[] = [];
      if (monthDay.isBetween(foundEvent.startDate, foundEvent.endDate, 'day', '[]')) {
        foundEventHighlighTypes.push(HighLiteType.eventDay);

        if (foundEvent.selected) {
          foundEventHighlighTypes.push(HighLiteType.selected);
        }
        if (monthDay.isSame(foundEvent.startDate, 'day')) {
          foundEventHighlighTypes.push(HighLiteType.start);
        }
        if (monthDay.isSame(foundEvent.endDate, 'day')) {
          foundEventHighlighTypes.push(HighLiteType.end);
        }
      }
      return foundEventHighlighTypes;
    });

    eventHighlights.forEach(highlights => highlightTypes.push(...highlights));
    return highlightTypes.length === 0 ? [HighLiteType.none] : highlightTypes;
  }
}
