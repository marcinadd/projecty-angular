import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../../models/Project';
import {ProjectRole} from '../../../models/ProjectRole';
import {User} from '../../../models/User';
import {DynamicUsernamesFormComponent} from '../../dynamic-usernames-form/dynamic-usernames-form.component';
import {ProjectRoleService} from '../../../services/project-role.service';
import {MatDialog} from '@angular/material/dialog';
import {DeleteDialogComponent} from '../../dialogs/delete-dialog/delete-dialog.component';
import {RoleNotificationService} from '../../../services/role-notification.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  project: Project = new Project();
  projectRoles: ProjectRole[];
  currentUser: User;
  newName = '';
  projectId = Number(this.route.snapshot.paramMap.get('id'));

  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    private projectService: ProjectService,
    private projectRoleService: ProjectRoleService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private roleNotificationService: RoleNotificationService
  ) {

  }

  ngOnInit(): void {
    this.projectService.getProjectByIdWithRoles(this.projectId).subscribe(data => {
      this.project = data.project;
      this.projectRoles = data.projectRoles;
      this.currentUser = data.currentUser;
    });
  }

  onChangeName() {
    const patchedProject = new Project();
    patchedProject.name = this.newName;
    this.projectService.patchProject(this.project.id, patchedProject).subscribe(project => {
      this.project.name = project.name;
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {id: this.projectId, name: this.project.name}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.deleteProject();
      }
    });
  }

  deleteProject() {
    this.projectService.deleteProject(this.projectId).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }

  onChangeRole(projectRole: ProjectRole, roleName: string) {
    const patchRole = new ProjectRole();
    patchRole.name = roleName;
    this.projectRoleService.patchProjectRole(projectRole.id, patchRole).subscribe(patchedRole => {
      const index = this.projectRoles.findIndex(p => p === projectRole);
      this.projectRoles[index] = patchedRole;
    });
  }

  onDeleteProjectRole(projectRoleId: number) {
    this.projectRoleService.deleteProjectRole(projectRoleId).subscribe(projectRole => {
      this.projectRoles = this.projectRoles.filter(p => p.id !== projectRoleId);
    });
  }

  onAddProjectRoles() {
    const usernames = this.usernamesComponent.getUsernameArray();
    this.projectService.addProjectRoles(this.project.id, usernames).subscribe(projectRoles => {
      this.projectRoles.push(...projectRoles);
      this.roleNotificationService.showNotificationsAboutNotAddedUsers(
        usernames, projectRoles, 'project', this.project.name
      );
    });
  }
}
