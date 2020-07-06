import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {TeamRole} from '../../../models/TeamRole';
import {MatDialog} from '@angular/material/dialog';
import {AddTeamComponent} from '../dialog/add-team/add-team.component';
import {TeamRoleService} from '../../../services/team-role.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamRoles: TeamRole[];

  constructor(
    private teamService: TeamService,
    private teamRoleService: TeamRoleService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teamRoles => {
      this.teamRoles = teamRoles;
    });
  }

  openAddTeamDialog() {
    const dialogRef = this.dialog.open(AddTeamComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTeam(result);
      }
    });
  }

  addTeam(teamForm) {
    this.teamService.createTeam(teamForm).subscribe(team => {
      this.getTeamRole(team.id);
    });
  }

  getTeamRole(teamId: number) {
    this.teamService.getTeamRoleForCurrentUserByTeamId(teamId).subscribe(teamRole => {
      this.teamRoles.push(teamRole);
      console.log(teamRole);
    });
  }
}
