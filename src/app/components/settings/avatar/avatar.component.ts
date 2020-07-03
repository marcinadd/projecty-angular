import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  avatar;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.avatar = files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.avatar);
    this.userService.uploadAvatar(formData).subscribe(() => {
      console.log('Avatar uploaded!');
    });
  }
}
