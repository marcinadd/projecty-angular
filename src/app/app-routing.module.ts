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
import {IndexComponent} from './components/index/index.component';
import {AddProjectSpecifiedTeamComponent} from './components/teams/add-project-specified-team/add-project-specified-team.component';
import {TeamProjectsComponent} from './components/teams/team-projects/team-projects.component';
import {MessagesComponent} from './components/message/messages/messages.component';
import {SendMessageComponent} from './components/message/send-message/send-message.component';


const routes: Routes = [
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'projects/:id/tasks/add', component: AddTaskComponent, canActivate: [AuthGuard]},
  {path: 'projects/:id/tasks', component: TasksComponent, canActivate: [AuthGuard]},
  {path: 'projects/add', component: AddProjectComponent, canActivate: [AuthGuard]},
  {path: 'projects/:id', component: ManageProjectComponent, canActivate: [AuthGuard]},
  {path: 'tasks/:id/manage', component: ManageTaskComponent, canActivate: [AuthGuard]},
  {path: 'teams/:id/projects/add', component: AddProjectSpecifiedTeamComponent, canActivate: [AuthGuard]},
  {path: 'teams/:id/projects', component: TeamProjectsComponent, canActivate: [AuthGuard]},
  {path: 'teams/add', component: AddTeamComponent, canActivate: [AuthGuard]},
  {path: 'teams/:id/manage', component: ManageTeamComponent, canActivate: [AuthGuard]},
  {path: 'teams', component: TeamsComponent, canActivate: [AuthGuard]},
  {path: 'messages/send', component: SendMessageComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},

  {path: 'login', component: LoginComponent},
  {path: '', component: IndexComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
