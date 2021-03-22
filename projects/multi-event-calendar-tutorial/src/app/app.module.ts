// SPDX-License-Identifier: MIT
// Copyright (c) 2021 Daimler TSS GmbH
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiEventCalendarModule } from 'multi-event-calendar';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        MultiEventCalendarModule,
        BrowserAnimationsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
