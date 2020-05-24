import {Project} from './Project';
import {TaskStatus} from './TaskStatus';
import {User} from './User';

export class Task {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  status: TaskStatus;
  project: Project;
  assignedUsers: User[];
}
