import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{path: '', redirectTo: 'user/login', pathMatch: 'full' },
{ path: 'chat', loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule) },
{path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
{path:'task', loadChildren: () => import('./features/task/task.module').then(m => m.TaskModule) },
{path:'group', loadChildren: () => import('./features/group/group.module').then(m => m.GroupModule) },
{path:'grade', loadChildren: () => import('./features/grade/grade.module').then(m => m.GradeModule) },
{path:'examplan', loadChildren: () => import('./features/exam-planning/exam-planning.module').then(m => m.ExamPlanningModule) },
{path:'event', loadChildren: () => import('./features/event/event.module').then(m => m.EventModule) },
{path:'document', loadChildren: () => import('./features/document/document.module').then(m => m.DocumentModule) },
{path:'coursematerial', loadChildren: () => import('./features/course-material/course-material.module').then(m => m.CourseMaterialModule) },
{path: 'course', loadChildren: () => import('./features/course/course.module').then(m => m.CourseModule) },
{path:'classsession', loadChildren: () => import('./features/class-session/class-session.module').then(m => m.ClassSessionModule) },
{path:'academiccalendar', loadChildren: () => import('./features/academic-calendar-entry/academic-calendar-entry.module').then(m => m.AcademicCalendarEntryModule) },
{path:'absence', loadChildren: () => import('./features/absence/absence.module').then(m => m.AbsenceModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
