import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../../../services/message.service';
import {Message} from '../../../models/Message';

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.component.html',
  styleUrls: ['./view-message.component.css']
})
export class ViewMessageComponent implements OnInit {
  messageId = Number(this.route.snapshot.paramMap.get('id'));
  message: Message;

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.messageService.getMessage(this.messageId).subscribe(message => {
      this.message = message;
      console.log(message);
    });
  }

}
