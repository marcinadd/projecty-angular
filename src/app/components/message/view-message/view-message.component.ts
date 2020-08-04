import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';
import {FileService} from '../../../services/file.service';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  messageId = Number(this.route.snapshot.paramMap.get('id'));
  message: Message;
  invertedRepliesMessage: Message;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private fileService: FileService
  ) {
  }

  ngOnInit(): void {
    this.messageService.getMessage(this.messageId).subscribe(message => {
      this.message = message;
      console.log(message);
      this.invertedRepliesMessage = this.invertMessageReplies(message);
    }, () => {
      this.router.navigate(['messages']);
    });
  }

  invertMessageReplies(msg: Message) {
    const arr: Message[] = [];
    arr.push(msg);
    while (msg.replyTo !== null) {
      arr.push(msg.replyTo);
      msg = msg.replyTo;
    }
    const length = arr.length;
    for (let i = 1; i < length; i++) {
      arr[i].reply = arr[i - 1];
    }
    return arr[length - 1];
  }
}
