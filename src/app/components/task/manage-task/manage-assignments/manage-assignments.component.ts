import {Component, Input, OnInit} from '@angular/core';
import {TaskData} from '../../../../models/TaskData';
import {TaskService} from '../../../../services/task.service';
import {User} from '../../../../models/User';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-manage-assignments',
  templateUrl: './manage-assignments.component.html',
  styleUrls: ['./manage-assignments.component.css']
})
export class ManageAssignmentsComponent implements OnInit {
  @Input() taskData: TaskData;
  assignUserForm;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.assignUserForm = this.formBuilder.group({username: ''});
  }

  ngOnInit(): void {
  }

  onAssignUser(form) {
    this.taskService.assignUser(this.taskData.task.id, form.username).subscribe(result => {
      this.taskData.task.assignedUsers.push(result);
    });
  }

  onRemoveAssigment(user: User) {
    this.taskService.removeAssignment(this.taskData.task.id, user.username).subscribe(() => {
      this.taskData.task.assignedUsers = this.taskData.task.assignedUsers.filter(u => u.id !== user.id);
    });
  }
}
