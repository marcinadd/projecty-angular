import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ChatHistoryData} from '../models/ChatHistoryData';
import {Page} from '../models/Page';
import {ChatMessage} from '../models/ChatMessage';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  apiChatUrl = environment.apiUrl + '/chat';

  constructor(private http: HttpClient) {
  }

  getChatHistory(): Observable<ChatHistoryData[]> {
    return this.http.get<ChatHistoryData[]>(this.apiChatUrl);
  }

  getChatMessages(username: string): Observable<Page<ChatMessage>> {
    return this.http.get<Page<ChatMessage>>(this.apiChatUrl + '/' + username);
  }

  createChatMessageFromSocketChatMessage(socketChatMessage): ChatMessage {
    const chatMessage = new ChatMessage();
    const sender = new User();
    const recipient = new User();
    sender.username = socketChatMessage.sender;
    recipient.username = socketChatMessage.recipient;
    chatMessage.sender = sender;
    chatMessage.recipient = recipient;
    chatMessage.text = socketChatMessage.text;
    chatMessage.sendDate = socketChatMessage.sendDate;
    return chatMessage;
  }
}
