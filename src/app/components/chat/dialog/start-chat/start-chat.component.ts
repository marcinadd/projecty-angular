import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../services/user.service';
import {UserData} from '../../../../models/UserData';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-start-chat',
  templateUrl: './start-chat.component.html',
  styleUrls: ['./start-chat.component.css']
})
export class StartChatComponent {
  users: UserData[];
  defaultAvatarUrl = environment.defaultAvatarUrl;

  constructor(
    public dialogRef: MatDialogRef<StartChatComponent>,
    private userService: UserService
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onTextChange(value: string) {
    if (value.length >= 5) {
      this.userService.getUsernamesStartWith(value).subscribe(usernames => {
        this.users = [];
        usernames.forEach(username => {
          const userData = new UserData();
          userData.username = username;
          this.loadAvatar(userData);
          this.users.push(userData);
        });
      });
    }
  }

  loadAvatar(userData: UserData) {
    this.userService.getAvatar(userData.username).subscribe(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        userData.avatar = reader.result;
      };
    });
  }

  onOptionSelected(value: any) {
    this.dialogRef.close(value);
  }
}
