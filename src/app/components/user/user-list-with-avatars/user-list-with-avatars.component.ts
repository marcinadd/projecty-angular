import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/User';

@Component({
  selector: 'app-user-list-with-avatars',
  templateUrl: './user-list-with-avatars.component.html',
  styleUrls: ['./user-list-with-avatars.component.css']
})
export class UserListWithAvatarsComponent implements OnInit {
  @Input() users: User[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
