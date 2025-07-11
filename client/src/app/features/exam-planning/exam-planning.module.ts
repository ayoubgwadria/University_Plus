import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamPlanningRoutingModule } from './exam-planning-routing.module';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';
import { ExamsListComponent } from './components/exams-list/exams-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateExamComponent,
    ExamDetailsComponent,
    ExamsListComponent
  ],
  imports: [
    CommonModule,
    ExamPlanningRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExamPlanningModule { }
