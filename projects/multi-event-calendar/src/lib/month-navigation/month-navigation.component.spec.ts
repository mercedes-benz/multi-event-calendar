// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthNavigationComponent } from './month-navigation.component';
import { By } from '@angular/platform-browser';

describe('MonthNavigationComponent', () => {
  let component: MonthNavigationComponent;
  let fixture: ComponentFixture<MonthNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render month select list if list is enabled', () => {
    component.allowNavigation = true;
    fixture.detectChanges();
    expect(component.isEnabled()).toBeTrue();
    expect(fixture.debugElement.query(By.css('.next-action'))).toBeTruthy();
  });

  it('should not render month select list if list is not enabled', () => {
    component.allowNavigation = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.next-action'))).toBeFalsy();
  });

  describe('previousMonthSelected should', () => {
    it('emit on previous month clicked', () => {
      spyOn(component.previousMonthSelected, 'emit');
      component.emitPreviousMonthClick();
      expect(component.previousMonthSelected.emit).toHaveBeenCalled();
    });
  });

  describe('nextMonthSelected should', () => {
    it('emit on next month clicked', () => {
      spyOn(component.nextMonthSelected, 'emit');
      component.emitNextMonthClick();
      expect(component.nextMonthSelected.emit).toHaveBeenCalled();
    });
  });
});
