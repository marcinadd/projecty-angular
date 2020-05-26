import {Component, Input, OnInit} from '@angular/core';
import {TaskData} from '../../../../models/TaskData';

@Component({
  selector: 'app-manage-assignments',
  templateUrl: './manage-assignments.component.html',
  styleUrls: ['./manage-assignments.component.css']
})
export class ManageAssignmentsComponent implements OnInit {
  @Input() taskData: TaskData;

  constructor() {
  }

  ngOnInit(): void {
  }

}
