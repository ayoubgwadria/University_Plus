import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseMaterialsListComponent } from './components/course-materials-list/course-materials-list.component';
import { CourseMaterialDetailsComponent } from './components/course-material-details/course-material-details.component';
import { CreateCourseMaterialComponent } from './components/create-course-material/create-course-material.component';

const routes: Routes = [
   { path: 'create', component: CreateCourseMaterialComponent },
    { path: 'list', component: CourseMaterialsListComponent },
    { path: ':id', component: CourseMaterialDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseMaterialRoutingModule { }
