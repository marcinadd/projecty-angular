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

  constructor(private http: HttpClient) {
  }

  apiChatUrl = environment.apiUrl + '/chat';

  static getAnotherUserUsername(chatMessage: ChatMessage, currentUserUsername): string {
    if (chatMessage.recipient.username !== currentUserUsername) {
      return chatMessage.recipient.username;
    }
    return chatMessage.sender.username;
  }

  static createNewChatHistoryData(chatMessage, anotherUserUsername): ChatHistoryData {
    const chatHistoryData = new ChatHistoryData();
    chatHistoryData.lastMessage = chatMessage;
    chatHistoryData.anotherUserUsername = anotherUserUsername;
    chatHistoryData.unreadMessageCount = 1;
    return chatHistoryData;
  }

  static createChatMessage(senderUsername, recipientUsername, text, sendDate): ChatMessage {
    const chatMessage = new ChatMessage();
    const sender = new User();
    const recipient = new User();
    sender.username = senderUsername;
    recipient.username = recipientUsername;
    chatMessage.sender = sender;
    chatMessage.recipient = recipient;
    chatMessage.text = text;
    chatMessage.sendDate = sendDate;
    return chatMessage;
  }

  getChatHistory(): Observable<ChatHistoryData[]> {
    return this.http.get<ChatHistoryData[]>(this.apiChatUrl);
  }

  getChatMessages(username: string): Observable<Page<ChatMessage>> {
    return this.http.get<Page<ChatMessage>>(this.apiChatUrl + '/' + username);
  }
}
