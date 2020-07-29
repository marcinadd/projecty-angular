import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../../../services/message.service';
import {Router} from '@angular/router';
import {NotificationsService} from 'angular2-notifications';
import {Message} from '../../../../models/Message';

@Component({
  selector: 'app-reply-to-message',
  templateUrl: './reply-to-message.component.html',
  styleUrls: ['./reply-to-message.component.css']
})
export class ReplyToMessageComponent implements OnInit {
  @Input() replyTo: Message;
  messageForm;
  attachments = [];

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      recipientUsername: '',
      title: '',
      text: '',
    });
  }

  onSubmit(value) {
    const formData = new FormData();
    formData.append('message', value);
    for (const atachment of this.attachments) {
      formData.append('multipartFiles', atachment);
    }
    formData.append('title', this.messageForm.get('title').value);
    formData.append('text', this.messageForm.get('text').value);
    this.messageService.replyToMessage(this.replyTo.id, formData).subscribe(result => {
      this.notificationsService.success('Success', 'Reply sent!');
    });
  }

  handleFileInput(files) {
    const arr = [];
    for (const file of files) {
      arr.push(file);
    }
    this.attachments = arr;
  }

}
