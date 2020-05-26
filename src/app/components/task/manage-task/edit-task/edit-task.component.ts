import {Component, Input, OnInit} from '@angular/core';
import {TaskData} from '../../../../models/TaskData';
import {TaskStatus} from '../../../../models/TaskStatus';
import {FormBuilder} from '@angular/forms';
import {Task} from '../../../../models/Task';
import {TaskService} from '../../../../services/task.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() taskData: TaskData;
  @Input() events: Observable<Task>;
  taskStatuses = Object.keys(TaskStatus);
  changeTaskDataForm;
  private eventsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.changeTaskDataForm = this.formBuilder.group({
      name: '',
      startDate: new Date(),
      endDate: new Date(),
      status: ''
    });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(task => this.onTaskDataLoaded(task));
  }

  onTaskDataLoaded(task: Task) {
    this.changeTaskDataForm.setValue(
      {name: task.name, startDate: task.startDate, endDate: task.endDate, status: TaskStatus[task.status]}
    );
  }


  onSubmitChangeTaskData(form) {
    this.taskService.patchTask(this.taskData.task.id, form).subscribe(task => {
      this.taskData.task = task;
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
