import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademicCalendarEntryRoutingModule } from './academic-calendar-entry-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAcademicCalendarComponent } from './components/create-academic-calendar/create-academic-calendar.component';
import { AcademicCalendarsListComponent } from './components/academic-calendars-list/academic-calendars-list.component';
import { AcademicCalendarDetailsComponent } from './components/academic-calendar-details/academic-calendar-details.component';


@NgModule({
  declarations: [
    CreateAcademicCalendarComponent,
    AcademicCalendarsListComponent,
    AcademicCalendarDetailsComponent
  ],
  imports: [
    CommonModule,
    AcademicCalendarEntryRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AcademicCalendarEntryModule { }
