import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamRole} from '../../../../models/TeamRole';
import {TeamRoleService} from '../../../../services/team-role.service';

@Component({
  selector: 'app-manage-team-roles',
  templateUrl: './manage-team-roles.component.html',
  styleUrls: ['./manage-team-roles.component.css']
})
export class ManageTeamRolesComponent implements OnInit {
  @Input() teamRoles: TeamRole[];
  @Output() teamRoleDeleted = new EventEmitter<TeamRole>();

  constructor(private teamRoleService: TeamRoleService) {
  }

  ngOnInit(): void {
  }

  onDeleteTeamRole(teamRole: TeamRole) {
    this.teamRoleService.deleteTeamRole(teamRole.id).subscribe(data => {
      this.teamRoleDeleted.emit(teamRole);
    });
  }

  onChangeTeamRole(teamRole: TeamRole, newName: string) {
    const patchedTeamRole = new TeamRole();
    patchedTeamRole.name = newName;
    this.teamRoleService.patchTeamRole(teamRole.id, patchedTeamRole).subscribe(data => {
      teamRole.name = data.name;
    });
  }
}
