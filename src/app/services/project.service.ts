import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
}
