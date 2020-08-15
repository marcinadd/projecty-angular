import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project.service';
import {ProjectRole} from '../../models/ProjectRole';
import {ProjectRoleService} from '../../services/project-role.service';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.css']
})
export class InvitationsComponent implements OnInit {
  projectRoleInvitations: ProjectRole[];

  constructor(
    private projectService: ProjectService,
    private projectRoleService: ProjectRoleService
  ) {
  }

  ngOnInit(): void {
    this.projectService.getInvitations().subscribe(projectRoles => {
      this.projectRoleInvitations = projectRoles;
    });
  }

  onAccept(invitation: ProjectRole) {
    this.projectRoleService.acceptInvitation(invitation.id).subscribe(projectRole => {
      this.projectRoleInvitations = this.projectRoleInvitations.filter(p => p.id !== projectRole.id);
    });
  }
}
