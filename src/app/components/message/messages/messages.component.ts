import {Component, OnInit} from '@angular/core';
import {Message} from '../../../models/Message';
import {MessageService} from '../../../services/message.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  receivedMessages: Message[];
  displayedColumns: string[] = ['username', 'title', 'text', 'sendDate'];
  pageSize = 5;
  pageLength = 0;

  constructor(
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getPageOfMessages(this.pageLength, this.pageSize);
  }

  onClick(message: Message) {
    this.router.navigate(['messages', message.id]);
  }

  onPageEvent(event: PageEvent) {
    this.getPageOfMessages(event.pageIndex, event.pageSize);
  }

  getPageOfMessages(pageIndex: number, pageSize: number) {
    this.messageService.getReceivedMessages(pageIndex, pageSize).subscribe(data => {
      this.receivedMessages = data.content;
      this.pageLength = data.totalElements;
    });
  }
}
