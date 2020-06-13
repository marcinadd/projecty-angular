import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../models/Message';
import {Page} from '../models/Page';
import {MessageType} from '../models/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiMessageUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) {
  }

  getPageOfMessages(messageType: MessageType, page: number, itemsPerPage: number): Observable<Page<Message>> {
    const params = new HttpParams()
      .set('type', MessageType[messageType])
      .set('page', String(page))
      .set('itemsPerPage', String(itemsPerPage));
    return this.http.get<Page<Message>>(this.apiMessageUrl, {params});
  }

  sendMessage(messageForm): Observable<Message> {
    return this.http.post<Message>(this.apiMessageUrl, messageForm, environment.httpOptions);
  }

  getMessage(messageId: number): Observable<Message> {
    return this.http.get<Message>(this.apiMessageUrl + '/' + messageId);
  }
}
