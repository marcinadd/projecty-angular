import {Component, OnInit} from '@angular/core';
import {ProjectTasksData} from '../../../models/ProjectTasksData';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute} from '@angular/router';
import {Task} from '../../../models/Task';
import {TaskStatus} from '../../../models/TaskStatus';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  projectTasksData: ProjectTasksData;
  currentDate = new Date();
  taskStatuses = TaskStatus;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.taskService.getProjectTasksData(Number(this.route.snapshot.paramMap.get('id'))).subscribe(projectTasksData => {
      this.projectTasksData = projectTasksData;
    });
  }

  getDateDifferenceInDays(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return Math.floor(
      (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) - Date.UTC(startDate.getFullYear(),
        startDate.getMonth(), startDate.getDate())) / (1000 * 60 * 60 * 24)
    );
  }

  hasPermissionToEditOrIsAssignedToTask(task: Task) {
    // TODO Check if is assigned to task by current username
    return this.projectTasksData.hasPermissionToEdit;
  }

  onStatusChange(task: Task, newStatus: TaskStatus) {
    const patchedTask = new Task();
    patchedTask.status = newStatus;
    this.taskService.patchTask(task.id, patchedTask).subscribe(() => {
      this.moveTaskToOtherGroupWithStatus(task, newStatus);
    });
  }

  moveTaskToOtherGroupWithStatus(task: Task, newStatus: TaskStatus) {
    switch (TaskStatus[task.status]) {
      case TaskStatus.TO_DO:
        this.projectTasksData.toDoTasks = this.projectTasksData.toDoTasks.filter(item => item.id !== task.id);
        break;
      case TaskStatus.IN_PROGRESS:
        this.projectTasksData.inProgressTasks = this.projectTasksData.inProgressTasks.filter(item => item.id !== task.id);
        break;
      case TaskStatus.DONE:
        this.projectTasksData.doneTasks = this.projectTasksData.doneTasks.filter(item => item.id !== task.id);
        break;
    }
    task.status = newStatus;
    switch (newStatus) {
      case TaskStatus.TO_DO:
        this.projectTasksData.toDoTasks.push(task);
        break;
      case TaskStatus.IN_PROGRESS:
        this.projectTasksData.inProgressTasks.push(task);
        break;
      case TaskStatus.DONE:
        this.projectTasksData.doneTasks.push(task);
        break;
    }
  }

}
