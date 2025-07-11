import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGradeComponent } from './components/create-grade/create-grade.component';
import { GradsListComponent } from './components/grads-list/grads-list.component';
import { GradeDetailsComponent } from './components/grade-details/grade-details.component';

const routes: Routes = [
  {path:'create',component: CreateGradeComponent},
  {path:'list',component:GradsListComponent},
  {path:':id',component:GradeDetailsComponent} 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
