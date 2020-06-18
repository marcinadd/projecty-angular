import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {Team} from '../../../../../models/Team';

@Component({
  selector: 'app-add-project-specified-team-dialog',
  templateUrl: './add-project-specified-team-dialog.component.html',
  styleUrls: ['./add-project-specified-team-dialog.component.css']
})
export class AddProjectSpecifiedTeamDialogComponent implements OnInit {
  projectCreateForm;

  constructor(
    public dialogRef: MatDialogRef<AddProjectSpecifiedTeamDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public team: Team
  ) {
    this.projectCreateForm = this.formBuilder.group({
      name: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    return this.projectCreateForm.value;
  }

  ngOnInit(): void {
  }
}
