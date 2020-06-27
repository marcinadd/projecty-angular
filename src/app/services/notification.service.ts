import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  apiNotificationsUrl = environment.apiUrl + '/notifications';

  constructor(private http: HttpClient) {
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiNotificationsUrl);
  }
}
