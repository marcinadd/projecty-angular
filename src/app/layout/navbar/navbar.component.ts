import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {NotificationService} from '../../services/notification.service';
import {NotificationSocketService} from '../../services/notification-socket.service';
import {Notification} from '../../models/Notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  unseenNotificationsCounter = 0;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private notificationSocketService: NotificationSocketService
  ) {
  }

  ngOnInit(): void {
    this.notificationService.getUnseenNotificationCount().subscribe(unreadNotificationCounter => {
      this.unseenNotificationsCounter = unreadNotificationCounter;
    });
    this.handleNotifications();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUsername() {
    return this.authService.getUsername();
  }

  handleNotifications() {
    this.notificationSocketService.connectAndSubscribe();
    this.notificationSocketService.notification.subscribe(notification => {
      this.handleIncomingNotification(notification);
    });
  }

  handleIncomingNotification(notification: Notification) {
    this.unseenNotificationsCounter++;
    //TODO Show notification
  }
}
