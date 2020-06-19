import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../models/Message';
import {MessageType} from '../../../../models/MessageType';
import {MessageService} from '../../../../services/message.service';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  receivedMessages: Message[];
  displayedColumns: string[] = ['username', 'title', 'text', 'sendDate'];
  @Input() messageType: MessageType;
  messageTypes = MessageType;
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
    this.messageService.getPageOfMessages(this.messageType, pageIndex, pageSize).subscribe(data => {
      this.receivedMessages = data.content;
      this.pageLength = data.totalElements;
    });
  }

}
