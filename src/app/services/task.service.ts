import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/Task';
import {Observable} from 'rxjs';

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
}
