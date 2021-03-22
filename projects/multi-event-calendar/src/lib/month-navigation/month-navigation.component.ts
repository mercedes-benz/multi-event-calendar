// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import * as dayjs_ from 'dayjs';

const dayjs = dayjs_;

@Component({
  selector: 'mecal-month-navigation',
  templateUrl: './month-navigation.component.html',
  styleUrls: ['./month-navigation.component.scss']
})
export class MonthNavigationComponent implements OnChanges {
  @Input()
  selectedMonth: number;
  @Input()
  allowNavigation = false;
  @Input()
  locale: string;
  @Output()
  previousMonthSelected = new EventEmitter<any>();
  @Output()
  nextMonthSelected = new EventEmitter<any>();

  monthName: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasChangedMonth(changes.selectedMonth)) {
      const firstDayOfMonthLocalized = dayjs().locale(this.locale).month(this.selectedMonth);
      this.monthName = firstDayOfMonthLocalized.format('MMMM');
    }
  }

  isEnabled(): boolean {
    return this.allowNavigation;
  }

  emitPreviousMonthClick(): void {
    this.previousMonthSelected.emit();
  }

  emitNextMonthClick(): void {
    this.nextMonthSelected.emit();
  }

  private hasChangedMonth(month: any): boolean {
    return month && (month.currentValue !== this.selectedMonth || month.isFirstChange());
  }
}
