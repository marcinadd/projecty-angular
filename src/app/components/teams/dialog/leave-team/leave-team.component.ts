import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeamRole} from '../../../../models/TeamRole';

@Component({
  selector: 'app-leave-team',
  templateUrl: './leave-team.component.html',
  styleUrls: ['./leave-team.component.css']
})
export class LeaveTeamComponent {

  constructor(
    public dialogRef: MatDialogRef<LeaveTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamRole) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
