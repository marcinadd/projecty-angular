import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../../models/Project';
import {ProjectRole} from '../../../models/ProjectRole';
import {User} from '../../../models/User';
import {DynamicUsernamesFormComponent} from '../../dynamic-usernames-form/dynamic-usernames-form.component';
import {ProjectRoleService} from '../../../services/project-role.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  project: Project = new Project();
  projectRoles: ProjectRole[];
  currentUser: User;
  newName: string = '';

  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    private projectService: ProjectService,
    private projectRoleService: ProjectRoleService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.projectService.getProjectByIdWithRoles(Number(this.route.snapshot.paramMap.get('id'))).subscribe(data => {
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

  onDeleteProject() {

  }

  onChangeRole() {

  }

  onDeleteProjectRole(projectRoleId: number) {
    console.log(projectRoleId);
    this.projectRoleService.deleteProjectRole(projectRoleId).subscribe(projectRole => {
      this.projectRoles = this.projectRoles.filter(p => p.id !== projectRoleId);
    });
  }

  onAddProjectRoles() {
    this.projectService.addProjectRoles(this.project.id, this.usernamesComponent.getUsernameArray()).subscribe(projectRoles => {
      this.projectRoles.push(...projectRoles);
      console.log(projectRoles);
    });
  }
}
