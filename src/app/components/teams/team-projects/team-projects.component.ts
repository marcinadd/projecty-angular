import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {ActivatedRoute} from '@angular/router';
import {TeamProjectsData} from '../../../models/TeamProjectsData';

@Component({
  selector: 'app-team-projects',
  templateUrl: './team-projects.component.html',
  styleUrls: ['./team-projects.component.css']
})
export class TeamProjectsComponent implements OnInit {
  teamId = Number(this.route.snapshot.paramMap.get('id'));
  teamProjectsData: TeamProjectsData;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {
    this.teamProjectsData = new TeamProjectsData();
  }

  ngOnInit(): void {
    this.teamService.getTeamProjects(this.teamId).subscribe(teamProjectsData => {
      this.teamProjectsData = teamProjectsData;
    });
  }
}
