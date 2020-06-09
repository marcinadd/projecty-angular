import {Component, OnInit} from '@angular/core';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  receivedMessages: Message[];

  constructor(private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.messageService.getReceivedMessages().subscribe(messages => {
      this.receivedMessages = messages;
    });
  }

}
