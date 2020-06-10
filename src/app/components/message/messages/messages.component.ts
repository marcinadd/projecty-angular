import {Component, OnInit} from '@angular/core';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  receivedMessages: Message[];
  displayedColumns: string[] = ['username', 'title', 'text', 'sendDate'];

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.messageService.getReceivedMessages().subscribe(messages => {
      this.receivedMessages = messages;
    });
  }

  onClick(message: Message) {
    this.router.navigate(['messages', message.id]);
  }
}
