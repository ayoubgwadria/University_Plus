import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateGroupComponent,
    GroupsListComponent,
    GroupDetailsComponent,

  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class GroupModule { }
