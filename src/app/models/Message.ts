import {User} from './User';
import {Attachment} from './Attachment';

export class Message {
  id: number;
  sender: User;
  recipient: User;
  sendDate: Date;
  seenDate: Date;
  title: string;
  text: string;
  attachments: Attachment[];
  replyTo: Message;
  reply: Message = null;
}
