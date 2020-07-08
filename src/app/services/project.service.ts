import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {ProjectRole} from '../models/ProjectRole';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  apiProjectsUrl = environment.apiUrl + '/projects';

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<any> {
    return this.http.get(this.apiProjectsUrl);
  }

  createProject(projectCreateForm): Observable<Project> {
    console.log(projectCreateForm);
    return this.http.post<Project>(this.apiProjectsUrl, projectCreateForm, environment.httpOptions);
  }

  getProjectByIdWithRoles(projectId: number): Observable<any> {
    return this.http.get<Project>(this.apiProjectsUrl + '/' + projectId, {params: new HttpParams().set('roles', String(true))});
  }

  patchProject(projectId: number, patchedProject: Project): Observable<Project> {
    return this.http.patch<Project>(this.apiProjectsUrl + '/' + projectId, patchedProject, environment.httpOptions);
  }

  getProjectData(projectId: number): Observable<Project> {
    return this.http.get<Project>(this.apiProjectsUrl + '/' + projectId);
  }

  addProjectRoles(projectId: number, projectRoles: string[]): Observable<ProjectRole[]> {
    return this.http.post<ProjectRole[]>(this.apiProjectsUrl + '/' + projectId + '/roles', projectRoles, environment.httpOptions);
  }

  deleteProject(projectId: number) {
    return this.http.delete(this.apiProjectsUrl + '/' + projectId);
  }

  getProjectRoleForCurrentUserByProjectId(projectId: number): Observable<ProjectRole> {
    return this.http.get<ProjectRole>(`${this.apiProjectsUrl}/${projectId}/projectRole`);
  }
}
