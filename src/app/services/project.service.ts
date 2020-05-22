import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiProjectsUrl = environment.apiUrl + '/projects';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiProjectsUrl);
  }
}
