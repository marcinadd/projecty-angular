import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {ChatSocketService} from '../../services/chat-socket.service';
import {FormBuilder} from '@angular/forms';
import {ChatService} from '../../services/chat.service';
import {ChatHistoryData} from '../../models/ChatHistoryData';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatMessage} from '../../models/ChatMessage';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatHistoryData: ChatHistoryData[];
  currentUserUsername = this.authService.getUsername();
  chatWithUsername;
  chatMessages: ChatMessage[] = [];
  newChatMessageForm;
  newChatMessageText = '';
  subscription: Subscription;

  constructor(
    private oAuthService: OAuthService,
    private chatSocketService: ChatSocketService,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newChatMessageForm = this.formBuilder.group({
      recipient: '',
      text: '',
    });
  }

  onMessageReceived(chatMessage) {
    if (chatMessage !== null) {
      if (chatMessage.sender.username === this.chatWithUsername) {
        this.chatMessages.unshift(chatMessage);
      }
    }
  }

  onSendMessage() {
    this.chatSocketService.sendMessage(this.chatWithUsername, this.newChatMessageText);
  }

  ngOnInit(): void {
    this.subscription = this.chatSocketService.chatMessage.subscribe(chatMessage => {
      this.onMessageReceived(chatMessage);
    });
    this.chatSocketService.connect();

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
      this.chatHistoryData.forEach(chatMessage => this.setAnotherUserUsername(chatMessage));
    });
  }

  loadChatMessages(username: string) {
    this.chatService.getChatMessages(username).subscribe(chatMessages => {
      this.chatMessages = chatMessages.content;
    });
  }

  setAnotherUserUsername(chatHistoryData: ChatHistoryData) {
    if (chatHistoryData.lastMessage.recipient.username !== this.currentUserUsername) {
      chatHistoryData.anotherUserUsername = chatHistoryData.lastMessage.recipient.username;
    } else {
      chatHistoryData.anotherUserUsername = chatHistoryData.lastMessage.sender.username;
    }
  }

  onChatSelected(chatData: ChatHistoryData) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {with: chatData.anotherUserUsername},
    });
  }
}
