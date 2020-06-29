import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Notification} from '../models/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {
  private subscription: Subscription;
  private notificationMessageSource = new BehaviorSubject<Notification>(null);
  notification = this.notificationMessageSource.asObservable();

  constructor(private socketService: SocketService) {
  }

  connectAndSubscribe() {
    this.socketService.connectAndSubscribe(environment.notificationsUrl, environment.subscribeNotificationsEndpoint);
    this.subscription = this.socketService.message.subscribe(message => {
      const notification = JSON.parse(message);
      if (notification instanceof Notification) {
        this.notificationMessageSource.next(notification);
      }
    });
  }
}
