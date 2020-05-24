import {Project} from './Project';
import {Task} from './Task';

export class ProjectTasksData {
  toDoTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
  project: Project;
  hasPermissionToEdit: boolean;
}
