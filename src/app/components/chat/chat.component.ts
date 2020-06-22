import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {ChatSocketService} from '../../services/chat-socket.service';
import {FormBuilder} from '@angular/forms';
import {ChatService} from '../../services/chat.service';
import {ChatHistoryData} from '../../models/ChatHistoryData';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ChatMessage} from '../../models/ChatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatHistoryData: ChatHistoryData[];
  currentUserUsername = this.authService.getUsername();
  chatWithUsername;
  chatMessages: ChatMessage[];
  newChatMessageForm;

  constructor(
    private oAuthService: OAuthService,
    private chatSocketService: ChatSocketService,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    this.newChatMessageForm = this.formBuilder.group({
      recipient: '',
      text: '',
    });
  }

  static onMessageReceived(stompMessage) {
    const chatMessage = JSON.parse(stompMessage.body);
    console.log(chatMessage);
  }

  onSendMessage(chatMessageForm) {
    this.chatSocketService.sendMessage(chatMessageForm.recipient, chatMessageForm.text);
  }

  ngOnInit(): void {
    this.chatSocketService.connect(ChatComponent.onMessageReceived);
    this.loadChatHistory();
    this.route.queryParams.subscribe(params => {
      this.chatWithUsername = params['with'];
      if (this.chatWithUsername !== undefined) {
        this.loadChatMessages(this.chatWithUsername);
      }
    });
  }

  loadChatHistory() {
    this.chatService.getChatHistory().subscribe(chatHistoryData => {
      this.chatHistoryData = chatHistoryData;
      this.chatHistoryData.forEach(chatMessage => this.setAnotherUserUsername(chatMessage.lastMessage));
    });
  }

  loadChatMessages(username: string) {
    this.chatService.getChatMessages(username).subscribe(chatMessages => {
      this.chatMessages = chatMessages.content;
      this.chatMessages.forEach(chatMessage => this.setAnotherUserUsername(chatMessage));
    });
  }

  setAnotherUserUsername(chatMessage: ChatMessage) {
    if (chatMessage.recipient.username !== this.currentUserUsername) {
      chatMessage.anotherUserUsername = chatMessage.recipient.username;
    } else {
      chatMessage.anotherUserUsername = chatMessage.sender.username;
    }
  }

}
