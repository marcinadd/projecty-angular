import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {ProjectRole} from '../../../models/ProjectRole';
import {ProjectsTeamData} from '../../../models/ProjectsTeamData';
import {MatDialog} from '@angular/material/dialog';
import {ProjectRolesDialogComponent} from './dialog/project-roles-dialog/project-roles-dialog.component';
import {Project} from '../../../models/Project';
import {AddProjectDialogComponent} from './dialog/add-project-dialog/add-project-dialog.component';
import {AddProjectSpecifiedTeamDialogComponent} from './dialog/add-project-specified-team-dialog/add-project-specified-team-dialog.component';
import {TeamService} from '../../../services/team.service';

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
    private teamService: TeamService,
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

  createProjectForSpecifiedTeam(projectsTeamData: ProjectsTeamData, teamForm) {
    console.log(projectsTeamData);
    this.teamService.addProjectToSpecifiedTeam(projectsTeamData.team.id, teamForm).subscribe(project => {
      projectsTeamData.projects.push(project);
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

  openAddProjectToTeam(projectsTeamData: ProjectsTeamData) {
    const dialogRef = this.dialog.open(AddProjectSpecifiedTeamDialogComponent, {
      width: '500px',
      data: projectsTeamData.team
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createProjectForSpecifiedTeam(projectsTeamData, result);
      }
    });
  }
}
