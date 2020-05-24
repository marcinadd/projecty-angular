import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../../models/Task';

@Component({
  selector: 'app-task-info',
  templateUrl: './task-info.component.html',
  styleUrls: ['./task-info.component.css']
})
export class TaskInfoComponent implements OnInit {
  @Input() task: Task;
  @Input() hasPermissionToEdit: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
