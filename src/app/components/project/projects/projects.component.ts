import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ProjectRole} from '../../../models/ProjectRole';
import {ProjectsTeamData} from '../../../models/ProjectsTeamData';
import {MatDialog} from '@angular/material/dialog';
import {ProjectRolesDialogComponent} from './dialog/project-roles-dialog/project-roles-dialog.component';
import {Project} from '../../../models/Project';
import {AddProjectDialogComponent} from './dialog/add-project-dialog/add-project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectRoles: ProjectRole[];
  projectsTeam: ProjectsTeamData[];

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projectRoles = data.projectRoles;
      this.projectsTeam = data.teamProjects;

      console.log(data);
    });
  }

  openProjectRolesDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectRolesDialogComponent, {
      width: '300px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  createProject(projectForm) {
    this.projectService.createProject(projectForm).subscribe(projectForm => {
      // TODO Add project to list
      console.log(projectForm);
    });
  }

  openAddProjectDialog() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: '500px',
      data: this.projectsTeam
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createProject(result);
      }
    });
  }
}
