import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';
import {TaskStatus} from '../../models/TaskStatus';
import {DateHelper} from '../../helpers/date-helper';
import {AddTeamComponent} from '../teams/dialog/add-team/add-team.component';
import {MatDialog} from '@angular/material/dialog';
import {TaskDetailsDialogComponent} from './dialog/task-details-dialog/task-details-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  taskStatuses = TaskStatus;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getUndoneAssignedTasksForCurrentUser();
  }

  getUndoneAssignedTasksForCurrentUser() {
    this.taskService.getUndoneAssignedTasksForCurrentUser().subscribe(tasks => {
      tasks.forEach(task => {
        task.startDate = new Date(task.startDate);
        task.endDate = new Date(task.endDate);
        task.dateDifferenceInDaysToStart = DateHelper.getDateDifferenceInDays(new Date(), task.startDate);
        task.dateDifferenceInDaysToEnd = DateHelper.getDateDifferenceInDays(new Date(), task.endDate);
        if (task.status === 'TO_DO') {
          this.toDoTasks.push(task);
        } else {
          this.inProgressTasks.push(task);
        }
      });
    });
  }

  setTaskStatus(task: Task, status: TaskStatus) {
    const patchedTask = new Task();
    patchedTask.status = status;
    this.taskService.patchTask(task.id, patchedTask).subscribe(taskResponse => {
      switch (taskResponse.status) {
        case TaskStatus.DONE:
          this.toDoTasks = this.toDoTasks.filter(t => task !== t);
          this.inProgressTasks = this.inProgressTasks.filter(t => task !== t);
          break;
        case TaskStatus.IN_PROGRESS:
          this.inProgressTasks.push(task);
          this.toDoTasks = this.toDoTasks.filter(t => task !== t);
          break;
        case TaskStatus.TO_DO:
          this.toDoTasks.push(task);
          this.inProgressTasks = this.inProgressTasks.filter(t => task !== t);
          break;
      }
      task.status = taskResponse.status;
    });
  }

  openTaskDetailsDialog(task: Task) {
    this.dialog.open(TaskDetailsDialogComponent, {
      width: '500px',
      data: task
    });
  }
}
