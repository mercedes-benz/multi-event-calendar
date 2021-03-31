<!-- SPDX-License-Identifier: MIT -->
<!-- Copyright (c) 2021 Daimler TSS GmbH -->
# Getting started with Multi-Event-Calendar

## Usage in your angular application

1. Ensure that npm knows github packages as registry through edit or create .npmrc file in your user directory:
    ```bash
    registry=https://npm.pkg.github.com/daimler
    ```
2. Install the library as dependency
    ```bash
    npm install @daimler/multi-event-calendar
    ```
   > Note: This will add the dependency to your package.json and import the MultiEventCalendar to your app.module
   
3. Use the library's component in your template
    ```bash
    <mecal-calendar></mecal-calendar>
    ```
    > Note: If you do not bind any [input parameters](README.md#inputs) the calendar shows up with defaults. You will get a year selection with 4 entries and the current month.
   
4. Listen to library's events in your template
    ```bash
    <mecal-calendar (daySelected)="markDayAsSelected(event)"></mecal-calendar>
    ```
    The library informs you about several user actions through different event emitters. To get an overview see here.
    You can use these events to create or update your events data. 
    A more complex example can be found in our example application's [template](./../multi-event-calendar-tutorial/src/app/app.component.html).
   
## <a name="inputs"></a>Inputs description

The library comes with several inputs to provide data or configuration.

### @Input() date: Date

Defines the earliest **year** which can be navigated to, and the (first) **month** which is displayed.
```bash
# in your js file: 
const firstOfMarch: Date = new Date(2021, 2, 1);

# in your template file
<mecal-calendar [date="firstOfMarch"]></mecal-calendar>
```

Default value is the **current date**.

### @Input() events: CalendarEvent[]

List of **events** (multiple day ranges) which should be displayed in the calendar. 
Please consider the interface CalendarEvent for correct type structure. 
```bash
# in your js file: 
const firstOfMarch: Date = new Date(2021, 2, 1);
const events: CalendarEvent[] = [
  { startDate: new Date(2021, 2, 1), endDate: new Date(2021, 2, 2), selected: true },
  { startDate: new Date(2021, 2, 6), endDate: new Date(2021, 2, 6), selected: false }
];

# in your template file
<mecal-calendar [date="firstOfMarch"] [events="events"]></mecal-calendar>
```

Default value is an empty array.

### @Input() numberOfMonths: number

Defines the **number of months** visible at once.
```bash
# in your template file
<mecal-calendar [numberOfMonths="2"]></mecal-calendar>
```
Default value is 1.

### @Input() yearDistance: number

Defines the **number of years** which are available in the year selection dropdown and which can be navigated into the future based on @Input date.
```bash
# in your js file: 
const firstOfMarch: Date = new Date(2021, 2, 1);

# in your template file
<mecal-calendar [date="firstOfMarch"] [yearDistance="10"]></mecal-calendar>
```
> Note: A year can always be navigated through from january to december.

Default value is 3.

### @Input() translationLocale: string

Defines the locale which is used to determine translations of month and day names, and to determine the first day of the week used as first column of the month.
```bash
# in your template file
<mecal-calendar [translationLocale="de"]></mecal-calendar>
```
> Note: Because [dayjs](https://day.js.org/) framework is used to calculate with dates you get an overview of available locale values [here](https://github.com/iamkun/dayjs/tree/dev/src/locale).

Default value is 'en'.


## Events overview
With the following emitted events you can handle several data changes done by the user's actions.
To get an impression how this could be done please have a look into our [example application](./../multi-event-calendar-tutorial/src/app). 

### @Output() daySelected: EventEmitter<number>

Emits when the user clicks at a day which is not part of any existing event.
The emitted value is a timestamp as identifier of the selected day.

This should be used for creation of a new event data.

### @Output() eventDaySelected: EventEmitter<number>

Emits when the user clicks at a day which is part of an existing event but only if that event is not marked as selected.
The emitted value is a timestamp as identifier of the selected day.

This should be used for selection change between event data.

### @Output() selectedEventDaySelected: EventEmitter<number>

Emits when the user clicks at a day which is part of an existing event but only if that event is marked as selected.
The emitted value is a timestamp as identifier of the selected day.

This could be used for any kind of data refreshing.

### @Output() dayFocused: EventEmitter<number>

Emits when the user enters any day cell with the mouse cursor.
The emitted value is a timestamp as identifier of the focused day.

This could be used to show some day specific information outside the calendar.

### @Output() monthSelected: EventEmitter<Date>

Emits when the user navigates to another month.
The emitted value is a timestamp as identifier of the first day of the month which was navigated to.

This could be used to update any month related information outside the calendar.

### @Output() yearSelected: EventEmitter<number>

Emits when the user selects an option in the year selection.
The emitted value is the selected year number (YYYY).

This could be used to update any year related information outside the calendar.
