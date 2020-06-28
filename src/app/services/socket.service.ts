import {Injectable} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {BehaviorSubject} from 'rxjs';

declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  stompClient;
  sessionId;
  private messageSource = new BehaviorSubject<string>(null);
  message = this.messageSource.asObservable();

  constructor(private oauthService: OAuthService) {
  }

  connectAndSubscribe(socketUrl, subscribeEndpoint) {
    const endpoint = socketUrl + '?access_token=' + this.oauthService.getAccessToken();
    const socket = new SockJS(endpoint);
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      console.log(that.stompClient.ws._transport.url);
      let url = that.stompClient.ws._transport.url;
      socketUrl = socketUrl.replace('http', 'ws');
      url = url.replace(socketUrl + '/', '');
      url = url.replace('/websocket', '');
      url = url.replace(/^[0-9]+\//, '');
      url = url.replace(/\?.*/, '');
      console.log('Your current session is: ' + url);
      that.sessionId = url;
      that.stompClient.subscribe(subscribeEndpoint + '-user' + that.sessionId, response => {
        that.messageSource.next(response.body);
      });
    });
  }
}
