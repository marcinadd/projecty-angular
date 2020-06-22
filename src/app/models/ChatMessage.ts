import {User} from './User';

export class ChatMessage {
  id: number;
  sender: User;
  recipient: User;
  sendDate: Date;
  seenDate: Date;
  text: string;
  anotherUserUsername: string;
}
