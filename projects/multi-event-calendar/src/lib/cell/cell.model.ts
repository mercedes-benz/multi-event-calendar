// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
export enum Type {
  date = 0,
  weekNumber = 1,
  weekDay = 2
}

export enum HighLiteType {
  none = 0,
  currentDay = 1,
  eventDay = 2,
  selected = 3,
  start = 4,
  end = 5
}

export interface Cell {
  id: string;
  label: string; // 5, 23, MON
  type: Type; // decides about text styling
  highLiteTypes: HighLiteType[]; // decides about cell styling
  active: boolean;
}

export interface DayCell extends Cell {
  timeStamp: number;
}
