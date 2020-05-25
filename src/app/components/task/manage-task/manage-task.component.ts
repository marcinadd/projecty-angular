import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TaskData} from '../../../models/TaskData';
import {TaskStatus} from '../../../models/TaskStatus';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  taskData: TaskData;
  changeTaskDataForm;
  taskStatuses = Object.keys(TaskStatus);

  constructor(
    private  taskService: TaskService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.changeTaskDataForm = this.formBuilder.group({
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      status: ''
    });
  }

  ngOnInit(): void {
    this.taskService.getTaskData(Number(this.route.snapshot.paramMap.get('id'))).subscribe(taskData => {
      this.taskData = taskData;
      const task = taskData.task;
      this.changeTaskDataForm.setValue(
        {name: task.name, startDate: task.startDate, endDate: task.endDate, status: TaskStatus[task.status]}
      );
    });
  }

  onSubmitChangeTaskData(form) {
    this.taskService.patchTask(this.taskData.task.id, form).subscribe(task => {
      this.taskData.task = task;
    });
  }
}
