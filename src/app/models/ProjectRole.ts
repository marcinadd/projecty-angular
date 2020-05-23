import {Project} from './Project';
import {User} from './User';

export class ProjectRole {
  id: number;
  name: string;
  user: User;
  project: Project;
}
