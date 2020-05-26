import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {TaskData} from '../../../models/TaskData';
import {Subject} from 'rxjs';
import {Task} from '../../../models/Task';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {
  taskData: TaskData;
  eventsSubject: Subject<Task> = new Subject<Task>();

  constructor(
    private  taskService: TaskService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.taskService.getTaskData(Number(this.route.snapshot.paramMap.get('id'))).subscribe(taskData => {
      this.taskData = taskData;
      this.eventsSubject.next(taskData.task);
    });
  }
}
