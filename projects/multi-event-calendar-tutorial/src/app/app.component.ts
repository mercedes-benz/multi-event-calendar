// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { Component } from '@angular/core';
import { CalendarEvent } from '@daimler/multi-event-calendar';
import { formatDate } from '@angular/common';

interface UserAction {
  action: string;
  selectedValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Multi-Event-Calendar-Tutorial';
  today = new Date();
  events: CalendarEvent[] = [
    {
      startDate: new Date(this.today.getFullYear(), this.today.getMonth()),
      endDate: new Date(this.today.getFullYear(), this.today.getMonth(), 5),
      selected: false
    },
    {
      startDate: new Date(this.today.getFullYear(), this.today.getMonth() + 1),
      endDate: new Date(this.today.getFullYear(), this.today.getMonth() + 1, 5),
      selected: true
    }
  ];

  userActions: UserAction[] = [];
  includeX = true;

  onDaySelected(timestamp: number): void {
    this.addUserAction('daySelected', formatDate(timestamp, 'mediumDate', 'en'));
  }

  onEventDaySelected(timestamp: number): void {
    this.addUserAction('eventDaySelected', formatDate(timestamp, 'mediumDate', 'en'));
  }

  onSelectedEventDaySelected(timestamp: number): void {
    this.addUserAction('selectedEventDaySelected', formatDate(timestamp, 'mediumDate', 'en'));
  }

  onMonthSelected(firstOfMonth: Date): void {
    this.addUserAction('monthSelected', formatDate(firstOfMonth.getTime(), 'mediumDate', 'en'));
  }

  onYearSelected(year: number): void {
    this.addUserAction('yearSelected', year.toString());
  }

  onDayFocused(timestamp: number): void {
    this.addUserAction('dayFocused', formatDate(timestamp, 'mediumDate', 'en'));
  }

  get userVisibleActions(): UserAction[] {
    return this.includeX ? this.userActions : this.userActions.filter(action => action.action !== 'dayFocused');
  }

  private addUserAction(action: string, selectedValue: string): void {
    this.userActions.push({
      action,
      selectedValue
    });
  }
}
