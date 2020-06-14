import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUserUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) {
  }

  getUsernamesStartWith(usernameStartsWith: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUserUrl + '/usernames?usernameStartsWith=' + usernameStartsWith);
  }
}
