// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cell, HighLiteType, Type } from './cell.model';

@Component({
  selector: 'mecal-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input()
  data: Cell;
  @Output()
  dayCellClicked = new EventEmitter<Cell>();
  @Output()
  dayCellFocused = new EventEmitter<Cell>();

  constructor() {}

  onMouseClick(): void {
    if (this.data.type === Type.date) {
      this.dayCellClicked.emit(this.data);
    }
  }

  onMouseEnter(): void {
    if (this.data.type === Type.date) {
      this.dayCellFocused.emit(this.data);
    }
  }

  isInActive(): boolean {
    return !(this.data && this.data.active);
  }

  isLabelTypeDate(): boolean {
    return this.data && this.data.type === Type.date;
  }

  isLabelTypeWeekNumber(): boolean {
    return this.data && this.data.type === Type.weekNumber;
  }

  isLabelTypeWeekDay(): boolean {
    return this.data && this.data.type === Type.weekDay;
  }

  isHighLiteTypeCurrentDay() {
    return this.data && this.data.highLiteTypes.find(type => type === HighLiteType.currentDay);
  }

  isHighLiteTypeEventDay() {
    return this.data && this.data.highLiteTypes.find(type => type === HighLiteType.eventDay);
  }

  isHighLiteTypeSelected() {
    return this.data && this.data.highLiteTypes.find(type => type === HighLiteType.selected);
  }

  isHighLiteTypeEventStart() {
    return this.data && this.data.highLiteTypes.find(type => type === HighLiteType.start);
  }

  isHighLiteTypeEventEnd() {
    return this.data && this.data.highLiteTypes.find(type => type === HighLiteType.end);
  }
}
