import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {Notification} from '../../models/Notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[];

  constructor(private notificationService: NotificationService) {

  }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }
}
