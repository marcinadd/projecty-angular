import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {Team} from '../../../models/Team';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DynamicUsernamesFormComponent} from '../../dynamic-usernames-form/dynamic-usernames-form.component';
import {TeamRole} from '../../../models/TeamRole';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {NotificationsService} from 'angular2-notifications';
import {RoleNotificationService} from '../../../services/role-notification.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private notificationsService: NotificationsService,
    private roleNotificationService: RoleNotificationService
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
    const usernames = this.usernamesComponent.getUsernameArray();
    this.teamService.addTeamRoles(this.teamId, usernames).subscribe(teamRoles => {
      this.team.teamRoles.push(...teamRoles);
      this.roleNotificationService.showNotificationsAboutNotAddedUsers(
        usernames, teamRoles, 'team', this.team.name
      );
    });
  }

  onTeamRoleDeleted(teamRole: TeamRole) {
    this.team.teamRoles = this.team.teamRoles.filter(t => t !== teamRole);
  }

  openDeleteTeamDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {id: this.teamId, name: this.team.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.deleteTeam();
      }
    });
  }

  deleteTeam() {
    this.teamService.deleteTeam(this.teamId).subscribe(() => {
      this.notificationsService.success('Success', 'Team ' + this.team.name + ' deleted', {timeOut: 5000});
      this.router.navigate(['/teams']);
    });
  }
}
