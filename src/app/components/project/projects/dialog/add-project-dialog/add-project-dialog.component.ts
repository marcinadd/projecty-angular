import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicUsernamesFormComponent} from '../../../../dynamic-usernames-form/dynamic-usernames-form.component';
import {FormBuilder} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css']
})
export class AddProjectDialogComponent implements OnInit {
  projectCreateForm;
  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    private formBuilder: FormBuilder,
  ) {
    this.projectCreateForm = this.formBuilder.group({
      name: ''
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.usernamesComponent !== undefined) {
      const usernameArray = this.usernamesComponent.getUsernameArray();
      return {name: this.projectCreateForm.value.name, usernames: usernameArray};
    }
    return null;
  }

  ngOnInit(): void {
  }
}
