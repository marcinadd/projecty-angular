import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/Task';
import {Observable} from 'rxjs';
import {ProjectTasksData} from '../models/ProjectTasksData';
import {TaskData} from '../models/TaskData';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiTaskUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {
  }

  createTask(task, projectId: number): Observable<Task> {
    return this.http.post<Task>(this.apiTaskUrl + '/project/' + projectId, task, environment.httpOptions);
  }

  getProjectTasksData(projectId): Observable<ProjectTasksData> {
    return this.http.get<ProjectTasksData>(this.apiTaskUrl + '/project/' + projectId);
  }

  patchTask(taskId: number, patchedTask: Task): Observable<Task> {
    return this.http.patch<Task>(this.apiTaskUrl + '/' + taskId, patchedTask, environment.httpOptions);
  }

  getTaskData(taskId: number): Observable<TaskData> {
    return this.http.get<TaskData>(this.apiTaskUrl + '/' + taskId);
  }
}
