import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeamRole} from '../models/TeamRole';

@Injectable({
  providedIn: 'root'
})
export class TeamRoleService {
  apiTeamRolesUrl = environment.apiUrl + '/teamRoles';

  constructor(private http: HttpClient) {
  }

  deleteTeamRole(teamRoleId: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiTeamRolesUrl + '/' + teamRoleId);
  }

  patchTeamRole(teamRoleId: number, patchedRole: TeamRole): Observable<TeamRole> {
    return this.http.patch<TeamRole>(this.apiTeamRolesUrl + '/' + teamRoleId, patchedRole, environment.httpOptions);
  }
}
