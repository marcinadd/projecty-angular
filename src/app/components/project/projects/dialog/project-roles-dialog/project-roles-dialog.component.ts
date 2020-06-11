import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Project} from '../../../../../models/Project';

@Component({
  selector: 'app-project-roles-dialog',
  templateUrl: './project-roles-dialog.component.html',
  styleUrls: ['./project-roles-dialog.component.css']
})
export class ProjectRolesDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public project: Project) {
  }

}
