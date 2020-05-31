import {User} from './User';
import {Team} from './Team';

export class TeamRole {
  id: number;
  name: string;
  user: User;
  team: Team;
}
