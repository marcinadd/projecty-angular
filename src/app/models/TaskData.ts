import {Project} from './Project';
import {Task} from './Task';

export class TaskData {
  task: Task;
  project: Project;
  notAssignedUsernames: string[];
}
