import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassSessionRoutingModule } from './class-session-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateClassSessionComponent } from './components/create-class-session/create-class-session.component';
import { ClassSessionsListComponent } from './components/class-sessions-list/class-sessions-list.component';
import { ClassSessionDetailsComponent } from './components/class-session-details/class-session-details.component';


@NgModule({
  declarations: [
    CreateClassSessionComponent,
    ClassSessionsListComponent,
    ClassSessionDetailsComponent
  ],
  imports: [
    CommonModule,
    ClassSessionRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClassSessionModule { }
