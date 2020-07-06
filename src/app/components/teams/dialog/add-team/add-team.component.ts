import {Component, ViewChild} from '@angular/core';
import {DynamicUsernamesFormComponent} from '../../../dynamic-usernames-form/dynamic-usernames-form.component';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {TeamService} from '../../../../services/team.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {
  teamCreateForm;
  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    public dialogRef: MatDialogRef<AddTeamComponent>,
    private teamService: TeamService,
    // private teamRoleService: TeamRoleService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.teamCreateForm = this.formBuilder.group({
      name: ''
    });
  }

  onSubmit() {
    if (this.usernamesComponent !== undefined) {
      const usernameArray = this.usernamesComponent.getUsernameArray();
      return {name: this.teamCreateForm.value.name, usernames: usernameArray};
    }
    return null;
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
