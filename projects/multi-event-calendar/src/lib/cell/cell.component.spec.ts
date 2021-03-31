// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellComponent } from './cell.component';
import { Cell, HighLiteType, Type } from './cell.model';

describe('CellComponent', () => {
  let component: CellComponent;
  let fixture: ComponentFixture<CellComponent>;
  const cellMock = {
    id: '',
    label: '',
    type: undefined,
    highLiteTypes: [],
    active: undefined
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cell-container', () => {
    expect(fixture.debugElement.query(By.css('.cell-container'))).toBeTruthy();
  });

  describe('Cell should', () => {
    it('be active', () => {
      component.data = { ...cellMock, active: true };
      fixture.detectChanges();
      expect(component.isInActive()).toBeFalse();
      expect(fixture.debugElement.query(By.css('.inactive'))).toBeFalsy();
    });
    it('be inactive', () => {
      component.data = { ...cellMock, active: false };
      fixture.detectChanges();
      expect(component.isInActive()).toBeTruthy();
      expect(fixture.debugElement.query(By.css('.inactive'))).toBeTruthy();
    });
  });

  describe('LabelType should', () => {
    it('be date', () => {
      component.data = { ...cellMock, type: Type.date };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.date'))).toBeTruthy();
    });
    it('be week number', () => {
      component.data = { ...cellMock, type: Type.weekNumber };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.weekNumber'))).toBeTruthy();
    });
    it('be week day', () => {
      component.data = { ...cellMock, type: Type.weekDay };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.weekDay'))).toBeTruthy();
    });
  });

  describe('HighLiteType should', () => {
    it('be CurrentDay', () => {
      component.data = { ...cellMock, highLiteTypes: [HighLiteType.currentDay] };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.currentDay'))).toBeTruthy();
    });
    it('be EventDay', () => {
      component.data = { ...cellMock, highLiteTypes: [HighLiteType.eventDay] };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.eventDay'))).toBeTruthy();
    });
    it('be Selected', () => {
      component.data = { ...cellMock, highLiteTypes: [HighLiteType.selected] };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.selected'))).toBeTruthy();
    });
    it('be Start', () => {
      component.data = { ...cellMock, highLiteTypes: [HighLiteType.start] };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.start'))).toBeTruthy();
    });
    it('be End', () => {
      component.data = { ...cellMock, highLiteTypes: [HighLiteType.end] };
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.end'))).toBeTruthy();
    });
  });

  describe('dayCellFocused should', () => {
    it('emit onMouseEnter if is a date cell', () => {
      component.data = {...cellMock, type: Type.date};
      spyOn(component.dayCellFocused, 'emit');
      component.onMouseEnter();
      expect(component.dayCellFocused.emit).toHaveBeenCalledWith({...cellMock, type: Type.date});
    });
  });

  describe('dayCellClicked should', () => {
    it('emit onMouseClick if is a date cell', () => {
      component.data = {...cellMock, type: Type.date};
      spyOn(component.dayCellClicked, 'emit');
      component.onMouseClick();
      expect(component.dayCellClicked.emit).toHaveBeenCalledWith({...cellMock, type: Type.date});
    });
  });
});
