import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../models/Team';

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

}
