import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';

const routes: Routes = [
    { path: 'create', component: CreateCourseComponent },
    { path: 'list', component: CoursesListComponent },
    { path: ':id', component:  CourseDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
