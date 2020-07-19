import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class RoleHelper {

  constructor(private notificationsService: NotificationsService) {
  }

  static getNotAddedUsernames(usernames: string[], addedRoles) {
    const addedUsernames = [];
    addedRoles.forEach(role => {
      // @ts-ignore
      addedUsernames.push(role.user.username);
    });
    return usernames.filter(username => addedUsernames.indexOf(username) < 0);
  }
}
