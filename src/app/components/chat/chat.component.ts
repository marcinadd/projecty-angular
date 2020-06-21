import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {ChatService} from '../../services/chat.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  newChatMessageForm;

  constructor(
    private oAuthService: OAuthService,
    private chatService: ChatService,
    private formBuilder: FormBuilder
  ) {
    this.newChatMessageForm = this.formBuilder.group({
      recipient: '',
      text: '',
    });
  }

  ngOnInit(): void {
    this.chatService.connect(this.onMessageReceived);
  }

  onMessageReceived(stompMessage) {
    const chatMessage = JSON.parse(stompMessage.body);
    console.log(chatMessage);
  }

  onSendMessage(chatMessageForm) {
    this.chatService.sendMessage(chatMessageForm.recipient, chatMessageForm.text);
  }
}
