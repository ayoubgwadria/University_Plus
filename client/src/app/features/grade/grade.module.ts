import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeDetailsComponent } from './components/grade-details/grade-details.component';
import { GradsListComponent } from './components/grads-list/grads-list.component';
import { CreateGradeComponent } from './components/create-grade/create-grade.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GradeDetailsComponent,
    GradsListComponent,
    CreateGradeComponent
  ],
  imports: [
    CommonModule,
    GradeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GradeModule { }
