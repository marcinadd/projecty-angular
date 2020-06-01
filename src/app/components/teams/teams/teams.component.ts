import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {TeamRole} from '../../../models/TeamRole';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teamRoles: TeamRole[];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teamRoles => {
      this.teamRoles = teamRoles;
    });
  }
}
