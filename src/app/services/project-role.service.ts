import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
}
