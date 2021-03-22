// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'mecal-year-navigation',
  templateUrl: './year-navigation.component.html',
  styleUrls: ['./year-navigation.component.scss']
})
export class YearNavigationComponent implements OnChanges {
  @Input()
  startYear: number;
  @Input()
  endYear: number;
  @Input()
  selectedYear: number;
  @Output()
  yearChanged = new EventEmitter<number>();

  years: number[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.hasChangedStartYear(changes.startYear) || this.hasChangedEndYear(changes.endYear)) {
      this.years = [];
      for (let year = this.startYear; year < this.endYear + 1; year++) {
        this.years.push(year);
      }
    }
  }

  onSelectionChange(event: MatOptionSelectionChange): void {
    if (event.isUserInput && this.selectedYear !== event.source.value) {
      this.yearChanged.emit(event.source.value);
    }
  }

  private hasChangedStartYear(startYear: any): boolean {
    return startYear && (startYear.previousValue !== this.startYear || startYear.isFirstChange());
  }

  private hasChangedEndYear(endYear: any): boolean {
    return endYear && (endYear.previousValue !== this.endYear || endYear.isFirstChange());
  }
}
