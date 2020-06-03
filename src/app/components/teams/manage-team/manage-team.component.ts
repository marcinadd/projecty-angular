import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {Team} from '../../../models/Team';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {DynamicUsernamesFormComponent} from '../../dynamic-usernames-form/dynamic-usernames-form.component';
import {TeamRole} from '../../../models/TeamRole';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent implements OnInit {
  teamId = Number(this.route.snapshot.paramMap.get('id'));
  team = new Team();
  eventsSubject: Subject<Team> = new Subject<Team>();

  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.teamService.getTeam(this.teamId).subscribe(team => {
      this.team = team;
      this.eventsSubject.next(team);
    });
  }

  onNameChanged(teamWithNameChanged: Team) {
    this.team = teamWithNameChanged;
  }

  onAddTeamRoles() {
    this.teamService.addTeamRoles(this.teamId, this.usernamesComponent.getUsernameArray()).subscribe(teamRoles => {
      this.team.teamRoles.push(...teamRoles);
    });
  }

  onTeamRoleDeleted(teamRole: TeamRole) {
    this.team.teamRoles = this.team.teamRoles.filter(t => t !== teamRole);
  }
}
