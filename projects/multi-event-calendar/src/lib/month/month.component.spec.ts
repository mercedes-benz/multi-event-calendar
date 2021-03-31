// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthComponent } from './month.component';
import { CellComponent } from '../cell/cell.component';
import { HighLiteType } from '../cell/cell.model';

describe('MonthComponent', () => {
  let component: MonthComponent;
  let fixture: ComponentFixture<MonthComponent>;
  const cellMock = {
    id: '',
    label: '',
    type: undefined,
    highLiteTypes: [],
    active: undefined,
    timeStamp: 1615466031
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthComponent, CellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthComponent);
    component = fixture.componentInstance;
    component.locale = 'en';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('daySelected should', () => {
    it('emit onDayCellClicked if cell is active', () => {
      spyOn(component.daySelected, 'emit');
      component.onDayCellClicked({...cellMock, active: true});
      expect(component.daySelected.emit).toHaveBeenCalledWith(cellMock.timeStamp);
    });
  });

  describe('eventDaySelected should', () => {
    it('emit onDayCellClicked if highlight type is EventDay', () => {
      spyOn(component.eventDaySelected, 'emit');
      component.onDayCellClicked({...cellMock, highLiteTypes: [HighLiteType.eventDay]});
      expect(component.eventDaySelected.emit).toHaveBeenCalledWith(cellMock.timeStamp);
    });
  });

  describe('selectedEventDaySelected should', () => {
    it('emit onDayCellClicked if highlight type is Selected', () => {
      spyOn(component.selectedEventDaySelected, 'emit');
      component.onDayCellClicked({...cellMock, highLiteTypes: [HighLiteType.selected]});
      expect(component.selectedEventDaySelected.emit).toHaveBeenCalledWith(cellMock.timeStamp);
    });
  });

  describe('dayFocused should', () => {
    it('emit onDayCellFocused if cell is active', () => {
      spyOn(component.dayFocused, 'emit');
      component.onDayCellFocused({...cellMock, active: true});
      expect(component.dayFocused.emit).toHaveBeenCalledWith(cellMock.timeStamp);
    });
  });
});
