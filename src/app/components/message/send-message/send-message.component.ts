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
  attachments = [];

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
      text: '',
    });
  }

  onSubmit(value) {
    const formData = new FormData();
    formData.append('message', value);
    for (const atachment of this.attachments) {
      formData.append('multipartFiles', atachment);
    }
    formData.append('recipientUsername', this.messageForm.get('recipientUsername').value);
    formData.append('title', this.messageForm.get('title').value);
    formData.append('text', this.messageForm.get('text').value);
    this.messageService.sendMessage(formData).subscribe(result => {
      this.router.navigate(['messages']);
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
