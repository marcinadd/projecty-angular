import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Task} from '../../../../models/Task';
import {UserService} from '../../../../services/user.service';
import {environment} from '../../../../../environments/environment';
import {TaskService} from '../../../../services/task.service';
import {TaskData} from '../../../../models/TaskData';
import {ProjectService} from '../../../../services/project.service';
import {Project} from '../../../../models/Project';

@Component({
  selector: 'app-task-details-dialog',
  templateUrl: './task-details-dialog.component.html',
  styleUrls: ['./task-details-dialog.component.css']
})
export class TaskDetailsDialogComponent implements OnInit {
  defaultAvatarUrl = environment.defaultAvatarUrl;
  taskData: TaskData;
  project: Project;

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: Task,
    private userService: UserService,
    private taskService: TaskService,
    private projectService: ProjectService
  ) {
  }

  ngOnInit(): void {
    this.taskService.getTaskData(this.task.id).subscribe(taskData => {
      this.taskData = taskData;
      this.taskData.task.assignedUsers.forEach(user => this.userService.loadAvatar(user));
      this.projectService.getProjectData(taskData.projectId).subscribe(project => {
        this.project = project;
      });
    });
  }

  onNoClick() {

  }
}
