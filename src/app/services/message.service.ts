import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiMessageUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) {
  }

  getReceivedMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiMessageUrl + '/receivedMessages');
  }

  sendMessage(messageForm): Observable<Message> {
    return this.http.post<Message>(this.apiMessageUrl, messageForm, environment.httpOptions);
  }

  getMessage(messageId: number): Observable<Message> {
    return this.http.get<Message>(this.apiMessageUrl + '/' + messageId);
  }
}
