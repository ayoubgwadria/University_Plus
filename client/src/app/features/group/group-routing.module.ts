import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupComponent } from './components/create-group/create-group.component';
import { GroupsListComponent } from './components/groups-list/groups-list.component';
import { GroupDetailsComponent } from './components/group-details/group-details.component';

const routes: Routes = [
  {path:'create',component: CreateGroupComponent},
  {path:'list',component: GroupsListComponent},
  {path:':id',component: GroupDetailsComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
