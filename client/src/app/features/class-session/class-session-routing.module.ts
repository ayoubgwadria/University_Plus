import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateClassSessionComponent } from './components/create-class-session/create-class-session.component';
import { ClassSessionsListComponent } from './components/class-sessions-list/class-sessions-list.component';
import { ClassSessionDetailsComponent } from './components/class-session-details/class-session-details.component';

const routes: Routes = [
  { path: 'create', component: CreateClassSessionComponent },
  { path: 'list', component: ClassSessionsListComponent },
  { path: ':id', component: ClassSessionDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassSessionRoutingModule {}
