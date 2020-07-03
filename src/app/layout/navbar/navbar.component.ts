import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../models/Notification';
import {NotificationsService} from 'angular2-notifications';
import {ChatMessage} from '../../models/ChatMessage';
import {environment} from '../../../environments/environment';
import {SocketService} from '../../services/socket.service';
import {UserService} from '../../services/user.service';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  unseenNotificationsCounter = 0;
  avatar: any = environment.defaultAvatarUrl;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private notificationsToastService: NotificationsService,
    private socketService: SocketService,
    private userService: UserService,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.getUnseenNotificationCount().subscribe(unreadNotificationCounter => {
      this.unseenNotificationsCounter = unreadNotificationCounter;
    });
    this.handleWebsocketMessages();
    this.getAvatar();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUsername() {
    return this.authService.getUsername();
  }

  private handleWebsocketMessages() {
    this.socketService.connectAndSubscribe(environment.chatUrl, environment.subscribeUserEndpoint);
    this.socketService.message.subscribe(message => {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage != null) {
        if (parsedMessage.sender !== undefined) {
          this.handleIncomingChatMessage(parsedMessage);
        } else {
          this.handleIncomingNotification(parsedMessage);
        }
      }
    });
  }

  private handleIncomingChatMessage(chatMessage: ChatMessage) {
    if (chatMessage !== null) {
      this.notificationsToastService.success(chatMessage.sender.username, chatMessage.text, {
        timeout: 5000
      });
    }
  }

  private handleIncomingNotification(notification: Notification) {
    if (notification !== null) {
      this.unseenNotificationsCounter++;
      this.notificationsToastService.info('Notification', notification.stringValue, {
        timeout: 5000
      });
    }
  }

  getAvatar() {
    const that = this;
    this.userService.getAvatar(this.getUsername()).subscribe(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        that.avatar = reader.result;
      };
    });
  }
}
