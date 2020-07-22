import {Injectable} from '@angular/core';
import {RoleHelper} from '../helpers/role-helper';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class RoleNotificationService {

  constructor(private notificationsService: NotificationsService) {
  }

  showNotificationsAboutNotAddedUsers(usernames: string[], addedRoles, objType: string, objName: string) {
    RoleHelper.getNotAddedUsernames(usernames, addedRoles).forEach(username => {
      this.notificationsService.error('Fail', `User ${username} can't be added to ${objType} ${objName}`, {timeOut: 5000});
    });
  }
}
