import {ChatMessage} from './ChatMessage';

export class ChatHistoryData {
  lastMessage: ChatMessage;
  unreadMessageCount: number;
  anotherUserUsername: string;
}
