import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseMaterialRoutingModule } from './course-material-routing.module';
import { CreateCourseMaterialComponent } from './components/create-course-material/create-course-material.component';
import { CourseMaterialsListComponent } from './components/course-materials-list/course-materials-list.component';
import { CourseMaterialDetailsComponent } from './components/course-material-details/course-material-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateCourseMaterialComponent,
    CourseMaterialsListComponent,
    CourseMaterialDetailsComponent
  ],
  imports: [
    CommonModule,
    CourseMaterialRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CourseMaterialModule { }
