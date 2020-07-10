import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../services/task.service';
import {Task} from '../../models/Task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];

  constructor(
    private taskService: TaskService
  ) {
  }

  ngOnInit(): void {
    this.getUndoneAssignedTasksForCurrentUser();
  }

  getUndoneAssignedTasksForCurrentUser() {
    this.taskService.getUndoneAssignedTasksForCurrentUser().subscribe(tasks => {
      tasks.forEach(task => {
        if (task.status === 'TO_DO') {
          this.toDoTasks.push(task);
        } else {
          this.inProgressTasks.push(task);
        }
      });
    });
  }
}
