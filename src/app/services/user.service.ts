import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileService} from './file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUsersUrl = environment.apiUrl + '/users';
  apiUserUrl = environment.apiUrl + '/user';

  constructor(private http: HttpClient, private fileService: FileService) {
  }

  getUsernamesStartWith(usernameStartsWith: string): Observable<string[]> {
    return this.http.get<string[]>(this.apiUsersUrl + '/usernames?usernameStartsWith=' + usernameStartsWith);
  }

  uploadAvatar(avatar): Observable<any> {
    return this.http.post<any>(this.apiUserUrl + '/avatar', avatar);
  }

  getAvatar(username: string) {
    return this.fileService.getFileAsBlob(`${this.apiUserUrl}/${username}/avatar`);
  }
}
