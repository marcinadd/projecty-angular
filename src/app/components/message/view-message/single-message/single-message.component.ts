import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../models/Message';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-single-message',
  templateUrl: './single-message.component.html',
  styleUrls: ['./single-message.component.css']
})
export class SingleMessageComponent implements OnInit {
  @Input() message: Message;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  getCurrentUserUsername() {
    console.log(this.authService.getUsername());
    return this.authService.getUsername();
  }

  onReplySent(reply: Message) {
    this.message.reply = reply;
  }
}
