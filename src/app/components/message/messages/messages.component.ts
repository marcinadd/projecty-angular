import {Component, OnInit} from '@angular/core';
import {MessageType} from '../../../models/MessageType';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messageType = MessageType;

  constructor() {
  }

  ngOnInit(): void {
  }
}
