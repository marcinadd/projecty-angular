import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ProjectsComponent} from './components/project/projects/projects.component';
import {AddProjectComponent} from './components/project/add-project/add-project.component';
import {ManageProjectComponent} from './components/project/manage-project/manage-project.component';
import {AddTaskComponent} from './components/task/add-task/add-task.component';
import {TasksComponent} from './components/task/tasks/tasks.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'projects/:id/tasks/add', component: AddTaskComponent},
  {path: 'projects/:id/tasks', component: TasksComponent},
  {path: 'projects/:id', component: ManageProjectComponent},
  {path: 'projects/add', component: AddProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
