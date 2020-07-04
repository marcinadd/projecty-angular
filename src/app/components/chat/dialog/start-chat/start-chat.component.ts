import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-start-chat',
  templateUrl: './start-chat.component.html',
  styleUrls: ['./start-chat.component.css']
})
export class StartChatComponent {
  usernames;
  selectedUsername = '';

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
        this.usernames = usernames;
        console.log(usernames);
      });
    }
  }

  onOptionSelected(value: any) {
    this.dialogRef.close(value);
  }
}
