import {User} from './User';

export class Message {
  id: number;
  sender: User;
  recipient: User;
  sendDate: Date;
  seenDate: Date;
  title: string;
  text: string;
}
