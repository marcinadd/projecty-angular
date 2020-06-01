import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProjectsComponent} from './components/project/projects/projects.component';
import {AddProjectComponent} from './components/project/add-project/add-project.component';
import {ManageProjectComponent} from './components/project/manage-project/manage-project.component';
import {AddTaskComponent} from './components/task/add-task/add-task.component';
import {TasksComponent} from './components/task/tasks/tasks.component';
import {ManageTaskComponent} from './components/task/manage-task/manage-task.component';
import {AuthGuard} from './guards/auth.guard';
import {AddTeamComponent} from './components/teams/add-team/add-team.component';
import {TeamsComponent} from './components/teams/teams/teams.component';
import {ManageTeamComponent} from './components/teams/manage-team/manage-team.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', canActivate: [AuthGuard], children: [
      {path: 'projects', component: ProjectsComponent},
      {path: 'projects/:id/tasks/add', component: AddTaskComponent},
      {path: 'projects/:id/tasks', component: TasksComponent},
      {path: 'projects/add', component: AddProjectComponent},
      {path: 'projects/:id', component: ManageProjectComponent},
      {path: 'tasks/:id/manage', component: ManageTaskComponent},
      {path: 'teams/add', component: AddTeamComponent},
      {path: 'teams/:id/manage', component: ManageTeamComponent},
      {path: 'teams', component: TeamsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
