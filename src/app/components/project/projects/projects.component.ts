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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectRoles: ProjectRole[];
  projectsTeam: ProjectsTeamData[];
  selectedTeamId;

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedTeamId = Number(params['team']);
    });

    this.projectService.getProjects().subscribe(data => {
      this.projectRoles = data.projectRoles;
      this.projectsTeam = data.teamProjects;
    });
  }

  openProjectRolesDialog(project: Project) {
    this.dialog.open(ProjectRolesDialogComponent, {
      width: '300px',
      data: project
    });
  }

  createProject(projectForm) {
    this.projectService.createProject(projectForm).subscribe(projectForm => {
      // TODO Add project to list
      console.log(projectForm);
    });
  }

  createProjectForSpecifiedTeam(projectsTeamData: ProjectsTeamData, teamForm) {
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

  getSelectedIndex(): number {
    if (this.projectsTeam) {
      if (this.selectedTeamId === undefined) {
        return 0;
      }
      for (let i = 0; i < this.projectsTeam.length; i++) {
        if (this.projectsTeam[i].team.id === this.selectedTeamId) {
          return i + 1;
        }
      }
    }
    return 0;
  }

  onSelectedIndexChange(index: number) {
    if (index === 0) {
      this.selectedTeamId = undefined;
      this.router.navigate([], {relativeTo: this.route});
    } else {
      this.selectedTeamId = this.projectsTeam[index - 1].team.id;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {team: this.selectedTeamId},
      });
    }
  }
}
