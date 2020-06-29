import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {ChatMessage} from '../models/ChatMessage';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService {
  subscription: Subscription;
  private chatMessageSource = new BehaviorSubject<ChatMessage>(null);
  chatMessage = this.chatMessageSource.asObservable();

  constructor(
    private oauthService: OAuthService,
    private userService: UserService,
    private socketService: SocketService
  ) {

  }

  connectAndSubscribe() {
    this.socketService.connectAndSubscribe(environment.chatUrl, environment.subscribeUserEndpoint);
    this.subscription = this.socketService.message.subscribe(message => {
      const notification = JSON.parse(message);
      this.chatMessageSource.next(notification);
    });
  }

  sendMessage(recipient: string, text: string) {
    this.socketService.send(recipient, text);
  }
}
