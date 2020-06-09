import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  messageForm;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      recipientUsername: '',
      title: '',
      text: ''
    });
  }

  onSubmit(value) {
    this.messageService.sendMessage(value).subscribe(data => {
      console.log(data);
    });
  }
}
