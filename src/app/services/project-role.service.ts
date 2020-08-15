import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectRole} from '../models/ProjectRole';

@Injectable({
  providedIn: 'root'
})
export class ProjectRoleService {
  apiProjectRolesUrl = environment.apiUrl + '/projectRoles';

  constructor(private http: HttpClient) {
  }

  deleteProjectRole(projectRoleId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiProjectRolesUrl + '/' + projectRoleId);
  }

  patchProjectRole(projectRoleId: number, patchedRole: ProjectRole): Observable<ProjectRole> {
    return this.http.patch<ProjectRole>(this.apiProjectRolesUrl + '/' + projectRoleId, patchedRole, environment.httpOptions);
  }

  acceptInvitation(projectRoleId: number): Observable<ProjectRole> {
    return this.http.post<ProjectRole>(`${this.apiProjectRolesUrl}/${projectRoleId}/accept`, null);
  }
}
