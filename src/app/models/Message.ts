import {User} from './User';

export class Message {
  sender: User;
  recipient: User;
  sendDate: Date;
  seenDate: Date;
  title: string;
  text: string;
}
