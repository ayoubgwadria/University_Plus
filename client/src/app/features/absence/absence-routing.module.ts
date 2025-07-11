import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAbsenceComponent } from './components/create-absence/create-absence.component';
import { AbsencesListComponent } from './components/absences-list/absences-list.component';
import { AbsenceDetailsComponent } from './components/absence-details/absence-details.component';

const routes: Routes = [
      { path: 'create', component: CreateAbsenceComponent },
      { path: 'list', component: AbsencesListComponent },
      { path: ':id', component:  AbsenceDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbsenceRoutingModule { }
