import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUsersUrl = environment.apiUrl + '/users';
  apiUserUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient) {
  }

  getUsernamesStartWith(usernameStartsWith: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUsersUrl + '/usernames?usernameStartsWith=' + usernameStartsWith);
  }

  uploadAvatar(avatar): Observable<any> {
    return this.http.post<any>(this.apiUserUrl + '/avatar', avatar);
  }

  getAvatar(username: string) {
    return this.http.get<any>(`${this.apiUserUrl}/user/${username}/avatar`);
  }
}
