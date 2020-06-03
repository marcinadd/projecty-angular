import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../models/Team';
import {TeamRole} from '../models/TeamRole';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiTeamsUrl = environment.apiUrl + '/teams';

  constructor(private http: HttpClient) {
  }

  createTeam(teamCreateForm): Observable<Team> {
    return this.http.post<Team>(this.apiTeamsUrl, teamCreateForm, environment.httpOptions);
  }

  getTeams(): Observable<TeamRole[]> {
    return this.http.get<TeamRole[]>(this.apiTeamsUrl);
  }

  getTeam(teamId: number): Observable<Team> {
    return this.http.get<Team>(this.apiTeamsUrl + '/' + teamId, {params: new HttpParams().set('roles', String(true))});
  }

  patchTeam(teamId: number, patchedTeam): Observable<Team> {
    return this.http.patch<Team>(this.apiTeamsUrl + '/' + teamId, patchedTeam, environment.httpOptions);
  }

  addTeamRoles(teamId: number, usernames: string[]): Observable<TeamRole[]> {
    return this.http.post<TeamRole[]>(`${this.apiTeamsUrl}/${teamId}/roles`, usernames, environment.httpOptions);
  }
}
