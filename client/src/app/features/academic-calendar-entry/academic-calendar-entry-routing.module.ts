import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAcademicCalendarComponent } from './components/create-academic-calendar/create-academic-calendar.component';
import { AcademicCalendarsListComponent } from './components/academic-calendars-list/academic-calendars-list.component';
import { AcademicCalendarDetailsComponent } from './components/academic-calendar-details/academic-calendar-details.component';

const routes: Routes = [
    { path: 'create', component: CreateAcademicCalendarComponent  },
    { path: 'list', component: AcademicCalendarsListComponent }, 
    { path: ':id', component: AcademicCalendarDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicCalendarEntryRoutingModule { }
