import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbsenceRoutingModule } from './absence-routing.module';
import { CreateAbsenceComponent } from './components/create-absence/create-absence.component';
import { AbsenceDetailsComponent } from './components/absence-details/absence-details.component';
import { AbsencesListComponent } from './components/absences-list/absences-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateAbsenceComponent,
    AbsenceDetailsComponent,
    AbsencesListComponent
  ],
  imports: [
    CommonModule,
    AbsenceRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AbsenceModule { }
