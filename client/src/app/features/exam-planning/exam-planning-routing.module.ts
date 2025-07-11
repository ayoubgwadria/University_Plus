import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamComponent } from './components/create-exam/create-exam.component';
import { ExamsListComponent } from './components/exams-list/exams-list.component';
import { ExamDetailsComponent } from './components/exam-details/exam-details.component';

const routes: Routes = [
    {path:'create',component: CreateExamComponent},
    {path:'list',component:ExamsListComponent},
    {path: ':id',component:ExamDetailsComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamPlanningRoutingModule { }
