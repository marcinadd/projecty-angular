import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ProjectRole} from '../../../models/ProjectRole';
import {ProjectsTeamData} from '../../../models/ProjectsTeamData';
import {MatDialog} from '@angular/material/dialog';
import {ProjectRolesDialogComponent} from './dialog/project-roles-dialog/project-roles-dialog.component';
import {Project} from '../../../models/Project';

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
    });
  }

  openProjectRolesDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectRolesDialogComponent, {
      width: '250px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
