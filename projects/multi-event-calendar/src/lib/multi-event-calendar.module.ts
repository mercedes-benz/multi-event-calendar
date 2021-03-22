// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH

import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar.component';
import { YearNavigationComponent } from './year-navigation/year-navigation.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CellComponent } from './cell/cell.component';
import { MonthNavigationComponent } from './month-navigation/month-navigation.component';
import { MonthComponent } from './month/month.component';
import { LocaleService } from './locale.service';

@NgModule({
  declarations: [CalendarComponent, YearNavigationComponent, CellComponent, MonthNavigationComponent, MonthComponent],
  providers: [LocaleService],
  imports: [MatSelectModule, CommonModule],
  exports: [CalendarComponent]
})
export class MultiEventCalendarModule { }
