import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MessageService} from '../../../services/message.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  messageForm;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
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
      this.router.navigate(['/messages']);
    });
  }
}
