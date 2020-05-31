import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicUsernamesFormComponent} from '../../dynamic-usernames-form/dynamic-usernames-form.component';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {TeamService} from '../../../services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {

  teamCreateForm;

  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    private teamService: TeamService,
    // private teamRoleService: TeamRoleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.teamCreateForm = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(values) {
    const usernameArray = this.usernamesComponent.getUsernameArray();
    console.log(values);
    this.teamService.createTeam({name: values.name, usernames: usernameArray}).subscribe(() => {
      this.router.navigate(['/teams']);
    });
  }

}
